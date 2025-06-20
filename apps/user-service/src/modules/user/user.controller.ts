import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@libs/dto/user.dto';
import { User } from '@libs/entity/user.entity';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  private getTenantInfo(metadata: Record<string, any>) {
    const tenantId = metadata.internalRepr.get('tenant-id')?.[0];
    const dbName = metadata.internalRepr.get('db-name')?.[0];
    if (!tenantId || !dbName) {
      throw new RpcException('Tenant ID and database name are required');
    }
    return { tenantId, dbName };
  }

  @GrpcMethod('UserService', 'CreateUser')
  async create(
    createUserDto: CreateUserDto,
    metadata: Record<string, any>,
  ): Promise<any> {
    this.logger.log(
      `Received CreateUser request with data: ${JSON.stringify(createUserDto)}`,
    );
    const { tenantId, dbName } = this.getTenantInfo(metadata);
    this.logger.log(`Tenant info - tenantId: ${tenantId}, dbName: ${dbName}`);
    const result = await this.userService.create(createUserDto, {
      tenantId,
      dbName,
    });
    this.logger.log(`User created successfully: ${JSON.stringify(result)}`);
    return result;
  }

  @GrpcMethod('UserService', 'GetUser')
  async findOne(
    data: { id: string },
    metadata: Record<string, any>,
  ): Promise<any> {
    const { tenantId, dbName } = this.getTenantInfo(metadata);
    return this.userService.findOne(data.id, { tenantId, dbName });
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async update(
    data: { id: string } & UpdateUserDto,
    metadata: Record<string, any>,
  ): Promise<any> {
    const { tenantId, dbName } = this.getTenantInfo(metadata);
    const { id, ...updateUserDto } = data;
    const user = await this.userService.update(id, updateUserDto, {
      tenantId,
      dbName,
    });
    return user || null;
  }

  @GrpcMethod('UserService', 'DeleteUser')
  async remove(
    data: { id: string },
    metadata: Record<string, any>,
  ): Promise<{ success: boolean }> {
    const { tenantId, dbName } = this.getTenantInfo(metadata);
    await this.userService.remove(data.id, { tenantId, dbName });
    return { success: true };
  }

  @GrpcMethod('UserService', 'ListUsers')
  async findAll(
    data: {
      page?: number;
      limit?: number;
      search?: string;
      sort?: string;
      order?: 'ASC' | 'DESC';
    },
    metadata: Record<string, any>,
  ): Promise<{
    items: User[];
    total: number;
    page: number;
    limit: number;
    results: number;
  }> {
    const { tenantId, dbName } = this.getTenantInfo(metadata);
    return this.userService.findAll(data, { tenantId, dbName });
  }

  @GrpcMethod('UserService', 'ListUsersWithNameCount')
  async findAllWithNameCount(
    data: {
      page?: number;
      limit?: number;
      search?: string;
      sort?: string;
      order?: 'ASC' | 'DESC';
    },
    metadata: Record<string, any>,
  ): Promise<{
    items: { name: string; characters: number; symbols: number }[];
    total: number;
  }> {
    return {
      items: [
        {
          name: 'jay',
          characters: 3,
          symbols: 5,
        },
      ],
      total: 10,
    };
  }
}
