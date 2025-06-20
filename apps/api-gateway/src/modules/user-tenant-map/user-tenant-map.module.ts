import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTenantMapService } from './user-tenant-map.service';
import { UserTenantMapController } from './user-tenant-map.controller';
import { UserTenantMap } from './user-tenant-map.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTenantMap], 'central_db')],
  controllers: [UserTenantMapController],
  providers: [UserTenantMapService],
  exports: [UserTenantMapService],
})
export class UserTenantMapModule {}
