import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { TripModule } from './trip/trip.module';
import { MaintenanceModule } from './Maintenance/maintenance/maintenance.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { FuelLogModule } from './fuel-log/fuel-log.module';
import { LocationModule } from './location/location.module';
import { DriverModule } from './driver/driver.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [TripModule, MaintenanceModule, VehicleModule, FuelLogModule, LocationModule, DriverModule, AnalyticsModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
