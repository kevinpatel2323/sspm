import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import {
  SignUpDto,
  ConfirmSignUpDto,
  SignInDto,
  SetupMFADto,
  VerifyMFASetupDto,
  VerifyMFADto,
  GlobalSignOutDto,
  RefreshTokenDto,
} from './dto/auth-dto';
import { AuthService } from './auth.service';
import { TransformInterceptor } from '@libs/interceptors/transform.interceptor';

@Controller('auth')
// @UsePipes(new ValidationPipe({
//   whitelist: true,
//   forbidNonWhitelisted: true,
//   transform: true,
//   validateCustomDecorators: true
// }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    // todo: validate the invitation link - expired or not
    // todo : extract email, name, role, tenantId from the invitation link

    return this.authService.signUp(
      signUpDto.email,
      signUpDto.password,
      signUpDto.name,
      signUpDto.tenantId,
      signUpDto.role,
    );
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('verify-mfa-setup')
  @HttpCode(HttpStatus.OK)
  async verifyMFASetup(@Body() verifyMFASetupDto: VerifyMFASetupDto) {
    return this.authService.verifyMFASetup(
      verifyMFASetupDto.session,
      verifyMFASetupDto.totpCode,
      verifyMFASetupDto.email,
    );
  }

  // @Post('complete-mfa-setup')
  // @HttpCode(HttpStatus.OK)
  // async completeMFASetup(@Body() verifyMFADto: VerifyMFADto) {
  //   return this.authService.completeMfaSetup(
  //     verifyMFADto.session,
  //     verifyMFADto.totpCode,
  //     verifyMFADto.email,
  //   );
  // }

  @Post('verify-mfa')
  @HttpCode(HttpStatus.OK)
  async verifyMFA(@Body() verifyMFADto: VerifyMFADto) {
    return this.authService.verifyMFA(
      verifyMFADto.session,
      verifyMFADto.totpCode,
      verifyMFADto.email,
    );
  }

  @Post('global-signout')
  @HttpCode(HttpStatus.OK)
  async globalSignOut(@Body() globalSignOutDto: GlobalSignOutDto) {
    return this.authService.globalSignOut(globalSignOutDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
