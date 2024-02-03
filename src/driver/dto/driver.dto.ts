import { IsDate, IsInt, IsDecimal, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DriverDataDto {
  @ApiProperty()
  @IsInt()
  driver_id: number;

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsNumber()
  license_number: number;

  @ApiProperty()
  @IsNumber()
  contact_number: number;
}
