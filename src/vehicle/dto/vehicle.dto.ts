import { IsInt, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VehicleDataDto {
  @ApiProperty()
  @IsString()
  vehicle_id: string;

  @ApiProperty()
  @IsString()
  license_plate: string;

  @ApiProperty()
  @IsString()
  make: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsInt()
  model_year: number;

  @ApiProperty()
  @IsInt()
  capacity: number;

  @ApiProperty()
  @IsString()
  current_status: string;

  @ApiProperty()
  @IsInt()
  trip_id: number;

  @ApiProperty()
  @IsInt()
  fuel_log_id: number;

  @ApiProperty()
  @IsInt()
  vehicle_type_id: number;
}
