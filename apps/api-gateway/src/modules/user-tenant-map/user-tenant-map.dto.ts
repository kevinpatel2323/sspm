import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserTenantMappingDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  tenantId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class UserTenantMappingResponseDto {
  id: string;
  tenantId: string;
  userId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
