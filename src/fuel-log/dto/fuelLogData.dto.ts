import { IsDate, IsDecimal, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FuelLogDataDto {
  @ApiProperty()
  @IsInt()
  fuel_log_id: number;

  @ApiProperty()
  @IsDate()
  fuel_log_date: Date;

  @ApiProperty()
  @IsDecimal({ decimal_digits: '2' })
  fuel_quantity: number;

  @ApiProperty()
  @IsDecimal({ decimal_digits: '2' })
  distance: number;

  @ApiProperty()
  @IsDecimal({ decimal_digits: '2' })
  fuel_expense: number;

  @ApiProperty()
  @IsDecimal({ decimal_digits: '3' }) 
  cost_per_gallon: number;

  @ApiProperty()
  @IsInt()
  total_cost: number;

  @ApiProperty()
  @IsInt()
  vehicle_id: string; // Change the data type if needed
}
