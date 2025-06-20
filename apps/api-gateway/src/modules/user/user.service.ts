import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { firstValueFrom } from 'rxjs';
import * as createError from 'http-errors';
import { IUserService } from '@libs/interfaces/user-service.interface';
import { TenantService } from '../tenant/tenant.service';
import { CreateUserDto, UpdateUserDto } from '@libs/dto/user.dto';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: IUserService;
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject('USER_PACKAGE') private client: ClientGrpc,
    private tenantService: TenantService,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
    this.logger.log('UserService initialized with gRPC client');
    this.logger.log(
      `gRPC client service available: ${this.userService ? 'Yes' : 'No'}`,
    );
  }

  private async prepareMetadata(tenantId: string): Promise<Metadata> {
    if (!tenantId) {
      throw createError(400, 'tenantId is required in header');
    }

    const tenant = await this.tenantService.findById(tenantId);
    if (!tenant) {
      throw createError(404, 'Tenant not found');
    }

    const metadata = new Metadata();
    metadata.add('tenant-id', tenantId);
    metadata.add('db-name', tenant.dbName);
    this.logger.log(
      `Prepared metadata - tenantId: ${tenantId}, dbName: ${tenant.dbName}`,
    );
    return metadata;
  }

  async findNameCounts(tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return firstValueFrom(
      this.userService.listUsersWithNameCount({}, metadata),
    );
  }

  async create(createUserDto: CreateUserDto, tenantId: string) {
    this.logger.log(
      `Creating user with data: ${JSON.stringify(createUserDto)} for tenant: ${tenantId}`,
    );
    const metadata = await this.prepareMetadata(tenantId);
    this.logger.log('Sending gRPC request to user-service...');
    try {
      const result = await firstValueFrom(
        this.userService.createUser(createUserDto, metadata),
      );
      this.logger.log(
        `User created successfully via gRPC: ${JSON.stringify(result)}`,
      );
      return result;
    } catch (error) {
      this.logger.error(`gRPC call failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return firstValueFrom(this.userService.listUsers({}, metadata));
  }

  async findOne(id: string, tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return firstValueFrom(this.userService.getUser({ id }, metadata));
  }

  async update(id: string, updateUserDto: UpdateUserDto, tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return firstValueFrom(
      this.userService.updateUser(
        {
          id,
          ...updateUserDto,
        },
        metadata,
      ),
    );
  }

  async remove(id: string, tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return firstValueFrom(this.userService.deleteUser({ id }, metadata));
  }

  // Additional business logic methods can be added here
  async findUsersByEmail(email: string, tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    // This would require adding a corresponding method to the gRPC service
    // For now, we'll get all users and filter by email
    const allUsers = await firstValueFrom(
      this.userService.listUsers({}, metadata),
    );
    return allUsers.items?.filter((user) => user.email === email) || [];
  }

  async findActiveUsers(tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    // Since the User entity doesn't have an isActive property,
    // we'll return all users for now. This can be enhanced when the entity is updated
    const allUsers = await firstValueFrom(
      this.userService.listUsers({}, metadata),
    );
    return allUsers.items || [];
  }

  async getUserCount(tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    const allUsers = await firstValueFrom(
      this.userService.listUsers({}, metadata),
    );
    return allUsers.items?.length || 0;
  }
}
