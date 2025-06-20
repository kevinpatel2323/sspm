import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './tenant.dto';
import { Tenant } from './tenant.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles/roles.guard';
import { JwtGuard } from '../../guards/jwt/jwt.guard';

@ApiTags('tenants')
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @ApiOperation({ summary: 'Create a new tenant' })
  @ApiResponse({ status: 201, description: 'Tenant successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    console.log('Request came to tenanat controller...');
    return this.tenantService.create(createTenantDto);
  }

  @ApiOperation({ summary: 'Get all tenants' })
  @ApiResponse({ status: 200, description: 'Return all tenants.' })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('super-admin')
  @Get()
  findAll(): Promise<Tenant[]> {
    return this.tenantService.findAll();
  }

  @ApiOperation({ summary: 'Get a tenant by id' })
  @ApiResponse({ status: 200, description: 'Return the tenant.' })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tenant | null> {
    return this.tenantService.findById(id);
  }
}
