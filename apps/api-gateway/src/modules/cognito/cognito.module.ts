import { Module } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { CognitoRbacService } from './cognito-rbac.service';
import { CognitoSsoService } from './cognito-sso.service';
import { CognitoSsoController } from './cognito-sso.controller';
import { TokenRevocationService } from '../utils/token.revocation.service';

@Module({
  providers: [
    CognitoService,
    CognitoRbacService,
    CognitoSsoService,
    TokenRevocationService,
  ],
  exports: [CognitoService, CognitoRbacService, CognitoSsoService],
  controllers: [CognitoSsoController],
})
export class CognitoModule {}
