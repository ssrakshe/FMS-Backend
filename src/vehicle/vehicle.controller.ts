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
import { VehicleDataDto } from './dto/vehicle.dto';
import { VehicleService } from './vehicle.service';
import { DatabaseService } from 'src/database/database.service';

@Controller('vehicle')
@ApiTags('vehicle')
export class VehicleController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly vehicleService: VehicleService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a new vehicle' })
  @ApiCreatedResponse({
    description: 'The vehicle has been successfully added.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async addVehicle(@Body() vehicleData: VehicleDataDto) {
    const query = `
      INSERT INTO vehicle (vehicle_id, license_plate, make, model, model_year, capacity, current_status, trip_id, fuel_log_id, vehicle_type_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      vehicleData.vehicle_id,
      vehicleData.license_plate,
      vehicleData.make,
      vehicleData.model,
      vehicleData.model_year,
      vehicleData.capacity,
      vehicleData.current_status,
      vehicleData.trip_id,
      vehicleData.fuel_log_id,
      vehicleData.vehicle_type_id,
    ];

    try {
      const result = await this.databaseService.executeQuery(query, params);
      return { message: 'Vehicle added successfully', result };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Gets all vehicles' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getAllVehicles() {
    try {
      const query = 'SELECT * FROM vehicle';
      const results = await this.databaseService.executeQuery(query);
      return results;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('/:vehicle_id')
  @ApiOperation({ summary: 'Gets vehicle by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getVehicleById(@Param('vehicle_id') vehicle_id: string) {
    try {
      const query = `SELECT * FROM Vehicle v where v.vehicle_id="${vehicle_id}"`;
      console.log(query);
      const results = await this.databaseService.executeQuery(query);
      return results;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update vehicle by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiBody({ type: VehicleDataDto })
  async updateVehicleById(
    @Param('id') id: string,
    @Body() updatedVehicleData: Partial<VehicleDataDto>,
  ) {
    try {
      const updatedVehicle = await this.vehicleService.updateVehicle(
        id,
        updatedVehicleData,
      );

      if (!updatedVehicle) {
        return { error: 'No fields to update or vehicle not found' };
      }

      return updatedVehicle;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete vehicle by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async deleteVehicleById(@Param('id') id: string) {
    try {
      const deletionResult = await this.vehicleService.deleteVehicle(id);

      if (deletionResult.error) {
        console.log(deletionResult.error);
        return { error: deletionResult.error };
      }

      return { message: 'Vehicle deleted successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }
}
