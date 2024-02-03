import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { DatabaseService } from '../database/database.service';
import { TripController } from './trip.controller';

@Module({
  imports: [],
  controllers: [TripController],
  providers: [TripService, DatabaseService],
})
export class TripModule {}
