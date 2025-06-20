import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DatabaseModule } from './modules/database/database.module';
import { TestController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, './../../../.env'),
      cache: true,
      expandVariables: true,
    }),
    UserModule,
    DatabaseModule,
  ],
  controllers: [TestController],
})
export class AppModule {}
