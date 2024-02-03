import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LocationDataDto } from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async updateLocation(
    id: string,
    updatedLocationData: Partial<LocationDataDto>,
  ) {
    const updatedFields = Object.keys(updatedLocationData);

    if (updatedFields.length === 0) {
      return null; // No fields to update
    }

    const updateClause = updatedFields.map((field) => {
      return `${field} = ?`;
    });

    const query = `
      UPDATE Location
      SET
        ${updateClause.join(', ')}
      WHERE location_id = ?
    `;

    const values = [
      ...updatedFields.map((field) => updatedLocationData[field]),
      id,
    ];

    const updatedLocation = await this.databaseService.executeQuery(
      query,
      values,
    );

    if (updatedLocation.affectedRows >= 1) {
      return { message: 'Successfully Edited Location' };
    }
  }

  async deleteLocation(id: string) {
    const query = `
      DELETE FROM Location
      WHERE location_id = ?
    `;

    const values = [id];

    const deletionResult = await this.databaseService.executeQuery(
      query,
      values,
    );

    if (deletionResult.affectedRows > 0) {
      return { message: 'Location deleted successfully' };
    } else {
      return { error: 'Location not found or could not be deleted' };
    }
  }

  async getLocationById(id: string) {
    const query = `SELECT * FROM Location l where l.location_id = ${id}`;
    const results = await this.databaseService.executeQuery(query);
    return results;
  }

  async getAllLocations() {
    try {
      const query = 'SELECT * FROM Location';
      const results = await this.databaseService.executeQuery(query);
      return results;
    } catch (error) {
      return { error: error.message };
    }
  }
}
