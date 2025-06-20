import { Injectable } from '@nestjs/common';
import { CognitoService } from '../cognito/cognito.service';
import { RbacService } from './../rbac/rbac.service';
import { UserTenantMapService } from '../user-tenant-map/user-tenant-map.service';
import { UserService } from '../user/user.service';
import { GlobalSignOutDto, ChangePasswordDto } from './dto/auth-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly cognitoService: CognitoService,
    private readonly rbacService: RbacService,
    private readonly userTenantMapService: UserTenantMapService,
    private readonly userService: UserService,
  ) {}

  async signUp(
    email: string,
    password: string,
    name: string,
    tenantId: string,
    role: string,
  ) {
    // todo: add the user in the cognito user group based on the role
    return this.cognitoService.signUp(email, password, name, tenantId);
  }

  async signIn(email: string, password: string) {
    return this.cognitoService.signIn(email, password);
  }

  /**
   * Verify MFA setup and complete user onboarding
   * This method:
   * 1. Verifies the MFA setup with Cognito
   * 2. Creates user-tenant mapping in central database
   * 3. Assigns default role to the user
   * 4. Creates user record in the user service database
   *
   * @param session - MFA setup session token
   * @param totpCode - TOTP code from authenticator app
   * @param email - User's email address
   * @returns Authentication result with tokens
   */
  async verifyMFASetup(session: string, totpCode: string, email: string) {
    const result = await this.cognitoService.verifyMFASetup(
      session,
      totpCode,
      email,
    );
    const userId = result.userId;
    const tenantId = result.tenantId;
    const userName = result.userName;
    delete result.userId;
    delete result.tenantId;
    delete result.userName;

    // Create user-tenant mapping in the central database
    if (userId && tenantId) {
      try {
        await this.userTenantMapService.createUserTenantMapping(
          tenantId,
          userId,
        );
        console.log(
          `✅ User-tenant mapping created for userId: ${userId}, tenantId: ${tenantId}`,
        );
      } catch (error) {
        console.error('❌ Failed to create user-tenant mapping:', error);
        // Don't fail the MFA setup if mapping creation fails
      }
    }

    // Add the user to default user group - "read-only"
    try {
      await this.assignDefaultRole(email);
      console.log(`✅ Default role assigned to user: ${email}`);
    } catch (error) {
      console.error('❌ Failed to assign default role:', error);
      // Don't fail the MFA setup if role assignment fails
    }

    // Add user to the user service database
    if (userId && tenantId) {
      try {
        const userData = {
          id: userId,
          email: email,
          name: userName || email.split('@')[0], // Use userName from Cognito or fallback to email prefix
        };

        console.log(
          `🔍 About to call userService.create with data:`,
          userData,
          `tenantId:`,
          tenantId,
        );
        const user = await this.userService.create(userData, tenantId);
        console.log(`✅ User created successfully:`, user);
      } catch (error) {
        console.error('❌ Failed to create user in user service:', error);
        console.error('❌ Error details:', {
          message: error.message,
          stack: error.stack,
          code: error.code,
          details: error.details,
        });
        // Don't fail the MFA setup if user creation fails
      }
    }

    return result;
  }

  // async completeMfaSetup(session: string, totpCode: string, email: string) {
  //   return this.cognitoService.completeMfaSetup(session, totpCode, email);
  // }

  async verifyMFA(session: string, totpCode: string, email: string) {
    return this.cognitoService.verifyMFA(session, totpCode, email);
  }

  async forgotPassword(email: string) {
    return this.cognitoService.forgotPassword(email);
  }

  async confirmForgotPassword(
    email: string,
    password: string,
    confirmationCode: string,
  ) {
    return this.cognitoService.confirmForgotPassword(
      email,
      password,
      confirmationCode,
    );
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { email, currentPassword, newPassword } = changePasswordDto;
    return this.cognitoService.changePassword(
      email,
      currentPassword,
      newPassword,
    );
  }

  async assignDefaultRole(email: string) {
    // Default role is typically "read-only"
    await this.rbacService.assignRoleToUser(email, 'read-only');
  }

  async globalSignOut(globalSignOutDto: GlobalSignOutDto) {
    const { accessToken } = globalSignOutDto;

    return this.cognitoService.globalSignOut(accessToken);
  }

  async forcedGlobalSignOut(email: string) {
    return this.cognitoService.forcedGlobalSignOut(email);
  }

  async refreshToken(refreshToken: string) {
    return this.cognitoService.refreshToken(refreshToken);
  }
}
