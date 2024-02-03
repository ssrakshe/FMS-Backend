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

import { LocationService } from './location.service';
import { LocationDataDto } from './dto/location.dto';

@Controller('location')
@ApiTags('location')
export class LocationController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly locationService: LocationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a new location' })
  @ApiCreatedResponse({
    description: 'The location has been successfully added.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async addLocation(@Body() locationData: LocationDataDto) {
    try {
      // Define your SQL query for inserting the location into the database
      const query = `
        INSERT INTO Location (location_id, location_name, location_address, latitude, longitude, location_code)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      // Extract the values from the locationData object
      const params = [
        locationData.location_id,
        locationData.name,
        locationData.address,
        locationData.latitude,
        locationData.longitude,
        locationData.trip_id,
      ];

      // Execute the SQL query to insert the location
      const result = await this.databaseService.executeQuery(query, params);

      return { message: 'Location added successfully', result };
    } catch (error) {
      // Handle the error appropriately
      return { error: error.message };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Gets all locations' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getAllLocations() {
    try {
      // Add your logic here to fetch all locations from the database.
      // You can use the location service to execute the necessary SQL query.
      const locations = await this.locationService.getAllLocations(); // Adjust this based on your actual database structure and logic.
      return locations;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Gets a location by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getLocationById(@Param('id') id: string) {
    try {
      // Add your logic here to fetch a location by ID from the database.
      // You can use the location service to execute the necessary SQL query.
      const location = await this.locationService.getLocationById(id); // Adjust this based on your actual database structure and logic.
      return location;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a location by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiBody({ type: LocationDataDto })
  async updateLocationById(
    @Param('id') id: string,
    @Body() updatedLocationData: Partial<LocationDataDto>,
  ) {
    try {
      // Add your logic here to update a location by ID in the database.
      // You can use the location service to execute the necessary SQL query.
      const updatedLocation = await this.locationService.updateLocation(
        id,
        updatedLocationData,
      ); // Adjust this based on your actual database structure and logic.

      if (!updatedLocation) {
        return { error: 'No fields to update or location not found' };
      }

      return updatedLocation;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a location by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async deleteLocationById(@Param('id') id: string) {
    try {
      // Add your logic here to delete a location by ID from the database.
      // You can use the location service to execute the necessary SQL query.
      const deletionResult = await this.locationService.deleteLocation(id); // Adjust this based on your actual database structure and logic.

      if (deletionResult.error) {
        console.log(deletionResult.error);
        return { error: deletionResult.error };
      }

      return { message: 'Location deleted successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }
}
