import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [LocationService, DatabaseService],
  controllers: [LocationController],
})
export class LocationModule {}
