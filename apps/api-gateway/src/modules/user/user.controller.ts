import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@libs/dto/user.dto';
import { UserCountResponseDto, UserSearchResponseDto } from './user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get users with name counts' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({ status: 200, description: 'Return users with name counts.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  @Get('name-counts')
  async findNameCounts(@Headers('x-tenant-id') tenantId: string) {
    return this.userService.findNameCounts(tenantId);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    return this.userService.create(createUserDto, tenantId);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  @Get()
  async findAll(@Headers('x-tenant-id') tenantId: string) {
    return this.userService.findAll(tenantId);
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'User or tenant not found.' })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    return this.userService.findOne(id, tenantId);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'User or tenant not found.' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    return this.userService.update(id, updateUserDto, tenantId);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'User or tenant not found.' })
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    return this.userService.remove(id, tenantId);
  }

  @ApiOperation({ summary: 'Get users by email' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({
    status: 200,
    description: 'Return users with matching email.',
    type: UserSearchResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  @Get('search/email/:email')
  async findUsersByEmail(
    @Param('email') email: string,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    return this.userService.findUsersByEmail(email, tenantId);
  }

  @ApiOperation({ summary: 'Get user count' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({
    status: 200,
    description: 'Return total user count.',
    type: UserCountResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  @Get('count/total')
  async getUserCount(@Headers('x-tenant-id') tenantId: string) {
    const count = await this.userService.getUserCount(tenantId);
    return { count };
  }
}
