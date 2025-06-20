import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({
    description: 'The name of the tenant',
    example: 'Acme Corporation',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateTenantDto extends PartialType(CreateTenantDto) {}
