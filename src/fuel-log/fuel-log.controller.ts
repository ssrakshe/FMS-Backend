import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';
import { DatabaseService } from '../database/database.service';
import { FuelLogDataDto } from './dto/fuelLogData.dto';
import { FuelLogService } from './fuel-log.service';

@Controller('fuel-log')
@ApiTags('fuel-log')
export class FuelLogController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly fuelLogService: FuelLogService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a new fuel log entry' })
  @ApiCreatedResponse({
    description: 'The fuel log entry has been successfully added.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async addFuelLog(@Body() fuelLogData: FuelLogDataDto) {
    try {
      // Define your SQL query for inserting the fuel log entry into the database
      const query = `
        INSERT INTO FuelLog (fuel_log_id, fuel_log_date, fuel_quantity, distance, fuel_expense, cost_per_gallon, total_cost, vehicle_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Extract the values from the fuelLogData object
      const params = [
        fuelLogData.fuel_log_id,
        fuelLogData.fuel_log_date,
        fuelLogData.fuel_quantity,
        fuelLogData.distance,
        fuelLogData.fuel_expense,
        fuelLogData.cost_per_gallon,
        fuelLogData.total_cost,
        fuelLogData.vehicle_id,
      ];

      // Execute the SQL query to insert the fuel log entry
      const result = await this.databaseService.executeQuery(query, params);

      return { message: 'Fuel log entry added successfully', result };
    } catch (error) {
      // Handle the error appropriately
      return { error: error.message };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Gets all fuel log entries' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getAllFuelLogs() {
    try {
      // Add your logic here to fetch all fuel log entries from the database.
      // You can use the database service to execute the necessary SQL query.
      const fuelLogs = await this.fuelLogService.getAllFuelLogs(); // Adjust this based on your actual database structure and logic.
      return fuelLogs;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Gets a fuel log entry by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getFuelLogById(@Param('id') id: string) {
    try {
      // Add your logic here to fetch a fuel log entry by ID from the database.
      // You can use the database service to execute the necessary SQL query.
      const fuelLog = await this.fuelLogService.getFuelLogById(id); // Adjust this based on your actual database structure and logic.
      return fuelLog;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a fuel log entry by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiBody({ type: FuelLogDataDto })
  async updateFuelLogById(
    @Param('id') id: string,
    @Body() updatedFuelLogData: Partial<FuelLogDataDto>,
  ) {
    try {
      // Add your logic here to update a fuel log entry by ID in the database.
      // You can use the database service to execute the necessary SQL query.
      const updatedFuelLog = await this.fuelLogService.updateFuelLog(
        id,
        updatedFuelLogData,
      ); // Adjust this based on your actual database structure and logic.

      if (!updatedFuelLog) {
        return { error: 'No fields to update or fuel log entry not found' };
      }

      return updatedFuelLog;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a fuel log entry by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async deleteFuelLogById(@Param('id') id: string) {
    try {
      // Add your logic here to delete a fuel log entry by ID from the database.
      // You can use the database service to execute the necessary SQL query.
      const deletionResult = await this.fuelLogService.deleteFuelLog(id); // Adjust this based on your actual database structure and logic.

      if (deletionResult.error) {
        console.log(deletionResult.error);
        return { error: deletionResult.error };
      }

      return { message: 'Fuel log entry deleted successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }
}
