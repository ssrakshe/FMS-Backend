import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service'; // Import your database service or related dependencies// Import the DTO for DriverData
import { DriverDataDto } from './dto/driver.dto';

@Injectable()
export class DriverService {
  constructor(private readonly databaseService: DatabaseService) {} // Inject your database service or other dependencies here


  async updateDriver(id: string, updatedDriverData: Partial<DriverDataDto>) {
    const updatedFields = Object.keys(updatedDriverData);
    if (updatedFields.length === 0) {
      return null; // No fields to update
    }

    const updateClause = updatedFields.map((field) => {
      return `${field} = ?`;
    });

    const query = `
      UPDATE drivers
      SET
        ${updateClause.join(', ')}
      WHERE driver_id = ?
    `;

    const values = [
      ...updatedFields.map((field) => updatedDriverData[field]),
      id,
    ];

    const updatedDriver = await this.databaseService.executeQuery(
      query,
      values,
    );

    if (updatedDriver.affectedRows >= 1) {
      return { message: 'Successfully Edited Driver' };
    }
  }

  async deleteDriver(id: string) {
    const query = `
      DELETE FROM drivers
      WHERE driver_id = ?
    `;

    const values = [id];

    // Execute the DELETE statement
    const deletionResult = await this.databaseService.executeQuery(
      query,
      values,
    );

    if (deletionResult.affectedRows > 0) {
      return { message: 'Driver deleted successfully' };
    } else {
      return { error: 'Driver not found or could not be deleted' };
    }
  }
}
