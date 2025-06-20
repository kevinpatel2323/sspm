import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserTenantMapService } from './user-tenant-map.service';
import { UserTenantMap } from './user-tenant-map.entity';
import {
  CreateUserTenantMappingDto,
  UserTenantMappingResponseDto,
} from './user-tenant-map.dto';

@Controller('user-tenant-mappings')
export class UserTenantMapController {
  constructor(private readonly userTenantMapService: UserTenantMapService) {}

  @Post()
  async createMapping(
    @Body() mappingData: CreateUserTenantMappingDto,
  ): Promise<UserTenantMappingResponseDto> {
    return await this.userTenantMapService.createUserTenantMapping(
      mappingData.tenantId,
      mappingData.userId,
    );
  }

  @Get(':tenantId/:userId')
  async getMapping(
    @Param('tenantId') tenantId: string,
    @Param('userId') userId: string,
  ): Promise<UserTenantMappingResponseDto | null> {
    return await this.userTenantMapService.getUserTenantMapping(
      tenantId,
      userId,
    );
  }

  @Get('tenant/:tenantId')
  async getMappingsByTenant(
    @Param('tenantId') tenantId: string,
  ): Promise<UserTenantMappingResponseDto[]> {
    return await this.userTenantMapService.getMappingsByTenantId(tenantId);
  }

  @Get('user/:userId')
  async getMappingsByUser(
    @Param('userId') userId: string,
  ): Promise<UserTenantMappingResponseDto[]> {
    return await this.userTenantMapService.getMappingsByUserId(userId);
  }

  @Delete(':tenantId/:userId')
  async deactivateMapping(
    @Param('tenantId') tenantId: string,
    @Param('userId') userId: string,
  ): Promise<{ message: string }> {
    await this.userTenantMapService.deactivateUserTenantMapping(
      tenantId,
      userId,
    );
    return { message: 'Mapping deactivated successfully' };
  }
}
