import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTenantMap } from './user-tenant-map.entity';

@Injectable()
export class UserTenantMapService {
  constructor(
    @InjectRepository(UserTenantMap, 'central_db')
    private readonly userTenantMapRepository: Repository<UserTenantMap>,
  ) {}

  async createUserTenantMapping(
    tenantId: string,
    userId: string,
  ): Promise<UserTenantMap> {
    // Check if mapping already exists
    const existingMapping = await this.userTenantMapRepository.findOne({
      where: { tenantId, userId, active: true },
    });

    if (existingMapping) {
      return existingMapping;
    }

    // Create new mapping
    const mapping = this.userTenantMapRepository.create({
      tenantId,
      userId,
      active: true,
    });

    return await this.userTenantMapRepository.save(mapping);
  }

  async getUserTenantMapping(
    tenantId: string,
    userId: string,
  ): Promise<UserTenantMap | null> {
    return await this.userTenantMapRepository.findOne({
      where: { tenantId, userId, active: true },
    });
  }

  async deactivateUserTenantMapping(
    tenantId: string,
    userId: string,
  ): Promise<void> {
    await this.userTenantMapRepository.update(
      { tenantId, userId },
      { active: false },
    );
  }

  async getMappingsByTenantId(tenantId: string): Promise<UserTenantMap[]> {
    return await this.userTenantMapRepository.find({
      where: { tenantId, active: true },
    });
  }

  async getMappingsByUserId(userId: string): Promise<UserTenantMap[]> {
    return await this.userTenantMapRepository.find({
      where: { userId, active: true },
    });
  }
}
