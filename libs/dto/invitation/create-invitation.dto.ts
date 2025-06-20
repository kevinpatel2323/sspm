import {
  IsEmail,
  IsString,
  IsUUID,
  IsEnum,
  IsArray,
  ValidateNested,
  ArrayMaxSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateInvitationDto {
  @ApiProperty({
    description: 'Email address of the user to invite',
    example: 'ronak@alchemytech.ca',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Role to assign to the user',
    enum: UserRole,
    example: UserRole.ADMIN,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'UUID of the tenant',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  tenantId: string;
}

export class CreateBulkInvitationDto {
  @ApiProperty({
    description: 'Array of invitations to create',
    type: [CreateInvitationDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvitationDto)
  @ArrayMaxSize(5, { message: 'Maximum 5 invitations can be sent at once' })
  invitations: CreateInvitationDto[];
}
