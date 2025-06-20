import { Module, Global } from '@nestjs/common';
import { TokenRevocationService } from './token.revocation.service';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [TokenRevocationService, EmailService],
  exports: [TokenRevocationService, EmailService],
})
export class UtilsModule {}
