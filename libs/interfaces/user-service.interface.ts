import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { CreateUserDto, UpdateUserDto } from '@libs/dto/user.dto';
import { User } from '@libs/entity/user.entity';

export interface IUserService {
  createUser(data: CreateUserDto, metadata: Metadata): Observable<User>;
  getUser(data: { id: string }, metadata: Metadata): Observable<User>;
  updateUser(
    data: { id: string } & UpdateUserDto,
    metadata: Metadata,
  ): Observable<User | null>;
  deleteUser(
    data: { id: string },
    metadata: Metadata,
  ): Observable<{ success: boolean }>;
  listUsers(
    data: {
      page?: number;
      limit?: number;
      search?: string;
      sort?: string;
      order?: string;
    },
    metadata: Metadata,
  ): Observable<{
    items: User[];
    total: number;
    page: number;
    limit: number;
    results: number;
  }>;
  listUsersWithNameCount(
    data: {
      page?: number;
      limit?: number;
      search?: string;
      sort?: string;
      order?: string;
    },
    metadata: Metadata,
  ): Observable<{
    items: { name: string; characters: number }[];
    total: number;
  }>;
}
