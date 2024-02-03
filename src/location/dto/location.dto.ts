import { IsDecimal, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocationDataDto {
  @ApiProperty()
  @IsInt()
  location_id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsDecimal({ decimal_digits: '6' })
  latitude: number;

  @ApiProperty()
  @IsDecimal({ decimal_digits: '6' })
  longitude: number;

  @ApiProperty()
  @IsInt()
  trip_id: number;
}
