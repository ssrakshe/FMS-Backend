import { IsDate, IsInt, IsDecimal, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TripDataDto {
  @ApiProperty()
  @IsInt()
  trip_id: number;

  @ApiProperty()
  @IsDate()
  start_date: Date;

  @ApiProperty()
  @IsDate()
  end_date: Date;

  @ApiProperty()
  @IsDecimal({ decimal_digits: '2' })
  distance: number;

  @ApiProperty()
  @IsDecimal({ decimal_digits: '2' })
  fuel_expense: number;

  @ApiProperty()
  @IsString()
  vehicle_id: string;

  @ApiProperty()
  @IsInt()
  driver_id: number;

  @ApiProperty()
  @IsInt()
  trip_type_id: number;
}
