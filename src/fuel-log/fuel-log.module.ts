import { Module } from '@nestjs/common';
import { FuelLogController } from './fuel-log.controller';
import { FuelLogService } from './fuel-log.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [FuelLogController],
  providers: [FuelLogService, DatabaseService],
})
export class FuelLogModule {}
