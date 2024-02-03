import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { FuelLogDataDto } from './dto/fuellogdata.dto';

@Injectable()
export class FuelLogService {
  constructor(private readonly databaseService: DatabaseService) {}

  async updateFuelLog(id: string, updatedFuelLogData: Partial<FuelLogDataDto>) {
    const updatedFields = Object.keys(updatedFuelLogData);

    if (updatedFields.length === 0) {
      return null; // No fields to update
    }

    const updateClause = updatedFields.map((field) => {
      return `${field} = ?`;
    });

    const query = `
      UPDATE FuelLog
      SET
        ${updateClause.join(', ')}
      WHERE fuel_log_id = ?
    `;

    const values = [
      ...updatedFields.map((field) => updatedFuelLogData[field]),
      id,
    ];

    const updatedFuelLog = await this.databaseService.executeQuery(
      query,
      values,
    );

    if (updatedFuelLog.affectedRows >= 1) {
      return { message: 'Successfully Edited Fuel Log' };
    }
  }

  async deleteFuelLog(id: string) {
    const query = `
      DELETE FROM FuelLog
      WHERE fuel_log_id = ?
    `;

    const values = [id];

    const deletionResult = await this.databaseService.executeQuery(
      query,
      values,
    );

    if (deletionResult.affectedRows > 0) {
      return { message: 'Fuel Log deleted successfully' };
    } else {
      return { error: 'Fuel Log not found or could not be deleted' };
    }
  }

  async getFuelLogById(id: string) {
    const query = `SELECT * FROM FuelLog f where f.fuel_log_id = ${id}`;
    const results = await this.databaseService.executeQuery(query);
    return results;
  }

  async getAllFuelLogs() {
    try {
      const query = 'SELECT * FROM FuelLog';
      const results = await this.databaseService.executeQuery(query);
      return results;
    } catch (error) {
      return { error: error.message };
    }
  }
}
