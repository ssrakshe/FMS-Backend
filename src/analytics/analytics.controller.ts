import { Controller, Get, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';
import { DatabaseService } from 'src/database/database.service';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Get('/total_trips/:driverId')
  @ApiOperation({ summary: 'Get total trips by a driver' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getTotalTripsMadebyADriver(@Param('driverId') driverId: string) {
    try {
      const totalTrips = await this.databaseService.getTotalTripsForDriver(
        parseInt(driverId, 10),
      );

      return { totalTrips };
    } catch (error) {
      console.error(error);
      throw new Error(
        'An error occurred while fetching total trips for the driver.',
      );
    }
  }

  @Get('/maintainance/:vehicleID')
  @ApiOperation({ summary: 'Get total cost of Maintaining a Vehicle' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getTotalMaintenanceCostForAVehicle(
    @Param('vehicleID') vehicleID: string,
  ) {
    try {
      const totalCost =
        await this.analyticsService.getTotalMaintenanceCostForAVehicle(
          vehicleID,
        );
      return totalCost;
    } catch (error) {
      console.error(error);
      throw new Error(
        'An error occurred while fetching total trips for the driver.',
      );
    }
  }

  @Get('/fuel_expense_avg/:yearId')
  @ApiOperation({ summary: 'Get cost Fuel Expense in a year(QTR_Moving_AVG)' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getFuelExpenseMOvingAvg(@Param('yearId') yearId: number) {
    try {
      const res = this.analyticsService.getFuelExpenseCostMovingAvg(yearId);
      return res;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching your data');
    }
  }

  @Get('/maintenanceCost')
  @ApiOperation({ summary: 'Get Maintenance Chart' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getMaintenanceCostForEachComponent() {
    try {
      const res = this.analyticsService.getMaintenanceCostForEachComponent();
      return res;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching your data');
    }
  }
  @Get('/fuelCost')
  async fuelCostAnalysis() {
    try {
      const res = this.analyticsService.fuelCostAnalysis();
      return res;
    } catch (e) {
      throw new Error('An error occurred while fetching your data');
    }
  }

  @Get('/fuelCostByVehicleType')
  async fuelCostAnalysisByVehicleType() {
    try {
      const res = this.analyticsService.fuelCostAnalysisByVehicleType();
      return res;
    } catch (e) {
      throw new Error('An error occurred while fetching your data');
    }
  }
}
