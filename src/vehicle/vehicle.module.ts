import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [],
  controllers: [VehicleController],
  providers: [VehicleService, DatabaseService],
})
export class VehicleModule {}
