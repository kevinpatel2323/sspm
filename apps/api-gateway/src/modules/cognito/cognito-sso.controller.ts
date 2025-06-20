import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { CognitoSsoService } from './cognito-sso.service';

@Controller('auth/sso')
export class CognitoSsoController {
  constructor(private readonly cognitoSsoService: CognitoSsoService) {}

  @Get('initiate')
  async initiateSso(@Query('provider') provider: string) {
    try {
      if (!['Google', 'Facebook', 'Apple'].includes(provider)) {
        throw new HttpException('Invalid provider', HttpStatus.BAD_REQUEST);
      }
      return await this.cognitoSsoService.initiateSsoAuth(provider);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('callback')
  async handleCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Query('error') error: string,
    @Query('error_description') errorDescription: string,
    @Res() res: Response,
  ) {
    console.log('📥 OAuth Callback Received');
    console.log('Code:', code ? `${code.substring(0, 20)}...` : 'MISSING');
    console.log('State:', state);
    console.log('Error:', error);

    // Handle OAuth errors
    if (error) {
      // return res.status(400).json();
      return {
        success: false,
        error: error,
        error_description: errorDescription,
        message: 'OAuth authentication failed',
      };
    }

    // Validate authorization code
    if (!code) throw new BadRequestException('Authorization code not received');

    try {
      // Exchange code for tokens
      const tokens = await this.cognitoSsoService.exchangeCodeForTokens(
        code,
        state,
      );

      console.log('✅ Token exchange successful');
      console.log(tokens);

      return {
        success: true,
        message: 'SSO authentication successful!',
        tokens,
      };
    } catch (error) {
      console.error('❌ Token exchange failed:', error);
      throw error;
    }
  }
}
