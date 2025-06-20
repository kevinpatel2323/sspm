import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider';
import * as crypto from 'crypto';

@Injectable()
export class CognitoSsoService {
  private readonly cognitoClient: CognitoIdentityProviderClient;
  private readonly userPoolId: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly region: string;
  private readonly redirectUri: string;
  private readonly cognitoDomain: string;

  constructor(private configService: ConfigService) {
    this.userPoolId =
      this.configService.get<string>('AWS_COGNITO_USER_POOL_ID') || '';
    this.clientId =
      this.configService.get<string>('AWS_COGNITO_CLIENT_ID') || '';
    this.clientSecret =
      this.configService.get<string>('AWS_COGNITO_CLIENT_SECRET') || '';
    this.region = this.configService.get<string>('AWS_REGION') || '';
    this.cognitoDomain =
      this.configService.get<string>('AWS_COGNITO_DOMAIN') ||
      `${this.userPoolId}.auth.${this.region}.amazoncognito.com`;
    this.redirectUri =
      this.configService.get<string>('SSO_REDIRECT_URI') ||
      'http://localhost:3000/auth/sso/callback';

    if (!this.clientSecret) {
      throw new Error('AWS_COGNITO_CLIENT_SECRET is not configured');
    }

    if (!this.cognitoDomain) {
      throw new Error('AWS_COGNITO_DOMAIN is not configured');
    }

    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.region,
    });
  }

  private generateSecretHash(username: string): string {
    return crypto
      .createHmac('SHA256', this.clientSecret)
      .update(username + this.clientId)
      .digest('base64');
  }

  async initiateSsoAuth(provider: string) {
    if (!['Google', 'Facebook', 'Apple'].includes(provider)) {
      throw new Error('Invalid provider');
    }

    const state = this.generateState();

    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      scope: 'email openid phone',
      redirect_uri: this.redirectUri,
      provider,
    });

    if (state) {
      params.append('state', state);
    }

    const authorizationUrl = `${this.cognitoDomain}/login?${params.toString()}`;
    console.log('🔗 Generated authorization URL:', authorizationUrl);

    return {
      authorizationUrl,
      state,
    };
  }

  async exchangeCodeForTokens(code: string, state: string) {
    if (!code) {
      throw new Error('Authorization code is required');
    }

    const tokenEndpoint = `${this.cognitoDomain}/oauth2/token`;

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.clientId,
      code: code,
      redirect_uri: this.redirectUri,
    });

    const headers: Record<string, string> = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (this.clientSecret) {
      const authString = Buffer.from(
        `${this.clientId}:${this.clientSecret}`,
      ).toString('base64');
      headers['Authorization'] = `Basic ${authString}`;
    }

    console.log('🔑 Token Exchange Parameters:', {
      endpoint: tokenEndpoint,
      params: Object.fromEntries(params),
      headers: { ...headers, Authorization: '[REDACTED]' },
    });

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers,
        body: params,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Token exchange error:', errorData);
        throw new UnauthorizedException(
          errorData.error_description || 'Failed to exchange code for tokens',
        );
      }

      const tokens = await response.json();
      console.log('✅ Token exchange successful');

      return {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        idToken: tokens.id_token,
        expiresIn: tokens.expires_in,
        tokenType: tokens.token_type,
      };
    } catch (error) {
      console.error('❌ Error exchanging code for tokens:', error);
      throw new UnauthorizedException('Authentication failed');
    }
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
