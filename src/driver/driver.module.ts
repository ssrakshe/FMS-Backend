import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [DriverService, DatabaseService],
  controllers: [DriverController],
})
export class DriverModule {}
