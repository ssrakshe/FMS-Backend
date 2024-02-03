import { IsDate, IsInt, IsDecimal, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MaintenanceDataDto {
  @ApiProperty()
  @IsInt()
  maintenance_id: number;

  @ApiProperty()
  @IsDate()
  maintain_date: Date;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDecimal({ decimal_digits: '2' })
  cost: number;

  @ApiProperty()
  @IsString()
  vehicle_id: string;

  @ApiProperty()
  @IsInt()
  maintenance_type_id: number;
}
