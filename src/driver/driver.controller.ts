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
import { DriverService } from './driver.service';
import { DatabaseService } from 'src/database/database.service';
import { DriverDataDto } from './dto/driver.dto';

@Controller('driver')
@ApiTags('driver')
export class DriverController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly driverService: DriverService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all drivers' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getAllDrivers() {
    try {
      const query = 'SELECT * FROM Driver';
      const results = await this.databaseService.executeQuery(query);

      return results;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a driver by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getDriverById(@Param('id') id: string) {
    try {
      const query = `SELECT * FROM driver d where d.driver_id=${id}`;
      const results = await this.databaseService.executeQuery(query);
      return results;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post()
  @ApiOperation({ summary: 'Add a new driver' })
  @ApiCreatedResponse({
    description: 'The driver has been successfully added.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async addDriver(@Body() driverData: DriverDataDto) {
    try {
      // Define your SQL query for inserting the driver data into the database
      const query = `
        INSERT INTO drivers (driver_id, first_name, last_name, license_number, contact_number)
        VALUES (?, ?, ?, ?, ?)
      `;

      // Extract the values from the driverData object
      const params = [
        driverData.driver_id,
        driverData.first_name,
        driverData.last_name,
        driverData.license_number,
        driverData.contact_number,
      ];

      // Execute the SQL query to insert the driver data
      const result = await this.databaseService.executeQuery(query, params);

      return { message: 'Driver added successfully', result };
    } catch (error) {
      // Handle the error appropriately
      return { error: error.message };
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a driver by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiBody({ type: DriverDataDto })
  async updateDriverById(
    @Param('id') id: string,
    @Body() updatedDriverData: Partial<DriverDataDto>,
  ) {
    try {
      const updatedTrip = await this.driverService.updateDriver(
        id,
        updatedDriverData,
      );

      if (!updatedTrip) {
        return { error: 'No fields to update or trip not found' };
      }

      return updatedTrip;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a driver by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async deleteDriverById(@Param('id') id: string) {
    try {
      const deletionResult = await this.driverService.deleteDriver(id);

      if (deletionResult.error) {
        console.log(deletionResult.error);
        return { error: deletionResult.error };
      }

      return { message: 'Trip deleted successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }
}
