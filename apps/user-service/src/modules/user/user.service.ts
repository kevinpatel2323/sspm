import { Injectable, Logger } from '@nestjs/common';
import { User } from '../../../../../libs/entity/user.entity';
import { CreateUserDto, UpdateUserDto } from '@libs/dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import {
  ResourceInternalException,
  ResourceNotFoundException,
} from '../../../../../libs/exceptions/grpc-base.exception';

interface NameCountResult {
  name: string;
  count: string;
}

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly MODULE_NAME = 'user';

  constructor(private databaseService: DatabaseService) {}

  async create(
    createUserDto: CreateUserDto,
    dbOptions: { tenantId: string; dbName: string },
  ): Promise<User> {
    try {
      this.logger.log(
        `Creating user with data: ${JSON.stringify(createUserDto)} for tenant: ${dbOptions.tenantId}`,
      );
      const connection = await this.databaseService.getTenantConnection(
        dbOptions.tenantId,
        dbOptions.dbName,
      );
      const userRepository = connection.getRepository(User);
      const user = userRepository.create({
        ...createUserDto,
        ...(createUserDto.id ? { id: createUserDto.id } : {}),
      });
      const savedUser = await userRepository.save(user);
      this.logger.log(
        `User created successfully: ${JSON.stringify(savedUser)}`,
      );
      return savedUser;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw new ResourceInternalException(
        'Failed to create user',
        this.MODULE_NAME,
      );
    }
  }

  async findAll(
    options: {
      page?: number;
      limit?: number;
      search?: string;
      sort?: string;
      order?: 'ASC' | 'DESC';
    },
    dbOptions: { tenantId: string; dbName: string },
  ): Promise<{
    items: User[];
    total: number;
    page: number;
    limit: number;
    results: number;
  }> {
    try {
      const connection = await this.databaseService.getTenantConnection(
        dbOptions.tenantId,
        dbOptions.dbName,
      );
      const userRepository = connection.getRepository(User);

      const queryBuilder = userRepository.createQueryBuilder('user');

      // Add search condition if search term is provided
      if (options.search) {
        queryBuilder.where(
          'user.name ILIKE :search OR user.email ILIKE :search',
          {
            search: `%${options.search}%`,
          },
        );
      }

      // Add sorting if provided
      if (options.sort) {
        const order = options.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        queryBuilder.orderBy(`user.${options.sort}`, order);
      } else {
        queryBuilder.orderBy('user.createdAt', 'DESC');
      }

      // Add pagination
      if (options.page && options.limit) {
        const skip = (options.page - 1) * options.limit;
        queryBuilder.skip(skip).take(options.limit);
      }

      const [items, total] = await queryBuilder.getManyAndCount();
      return {
        items,
        total,
        page: options.page || 1,
        limit: options.limit || total,
        results: items.length,
      };
    } catch (error) {
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      throw new ResourceInternalException(
        `Failed to fetch users: ${error.message}`,
        this.MODULE_NAME,
      );
    }
  }

  async findOne(
    id: string,
    dbOptions: { tenantId: string; dbName: string },
  ): Promise<User | null> {
    try {
      const connection = await this.databaseService.getTenantConnection(
        dbOptions.tenantId,
        dbOptions.dbName,
      );
      const userRepository = connection.getRepository(User);
      const user = await userRepository.findOne({ where: { id } });

      if (!user) {
        throw new ResourceNotFoundException('User', id, this.MODULE_NAME);
      }

      return user;
    } catch (error) {
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      throw new ResourceInternalException(
        `Failed to fetch user: ${error.message}`,
        this.MODULE_NAME,
      );
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    dbOptions: { tenantId: string; dbName: string },
  ): Promise<User | null> {
    try {
      const user = await this.findOne(id, dbOptions);

      if (!user) {
        throw new ResourceNotFoundException('User', id, this.MODULE_NAME);
      }

      const updatedUser = {
        ...user,
        ...updateUserDto,
        updatedAt: new Date(),
      };

      const connection = await this.databaseService.getTenantConnection(
        dbOptions.tenantId,
        dbOptions.dbName,
      );
      const userRepository = connection.getRepository(User);
      await userRepository.save(updatedUser);
      return updatedUser;
    } catch (error) {
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      throw new ResourceInternalException(
        'Failed to update user',
        this.MODULE_NAME,
      );
    }
  }

  async remove(
    id: string,
    dbOptions: { tenantId: string; dbName: string },
  ): Promise<void> {
    try {
      const user = await this.findOne(id, dbOptions);

      if (!user) {
        throw new ResourceNotFoundException('User', id, this.MODULE_NAME);
      }

      const connection = await this.databaseService.getTenantConnection(
        dbOptions.tenantId,
        dbOptions.dbName,
      );
      const userRepository = connection.getRepository(User);
      await userRepository.remove(user);
    } catch (error) {
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      throw new ResourceInternalException(
        'Failed to delete user',
        this.MODULE_NAME,
      );
    }
  }
}
