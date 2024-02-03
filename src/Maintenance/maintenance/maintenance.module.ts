import { Module } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [MaintenanceService, DatabaseService],
  controllers: [MaintenanceController],
})
export class MaintenanceModule {}
