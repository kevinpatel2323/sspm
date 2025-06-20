import { ApiProperty } from '@nestjs/swagger';

export class UserCountResponseDto {
  @ApiProperty({ description: 'Total number of users' })
  count: number;
}

export class UserSearchResponseDto {
  @ApiProperty({ description: 'Array of users matching the search criteria' })
  users: any[];
}

export class UserNameCountResponseDto {
  @ApiProperty({ description: 'User name' })
  name: string;

  @ApiProperty({ description: 'Count of users with this name' })
  count: number;
}
