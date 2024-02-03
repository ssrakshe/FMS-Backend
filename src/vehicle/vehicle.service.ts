import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { VehicleDataDto } from './dto/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addVehicle(vehicleData: VehicleDataDto) {
    try {
      // Add your database insertion logic here based on the provided vehicleData.
      // For example:
      const query = `
        INSERT INTO vehicle (
          vehicle_id,
          license_plate,
          make,
          model,
          model_year,
          capacity,
          current_status,
          trip_id,
          fuel_log_id,
          vehicle_type_id
        )
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

      const result = await this.databaseService.executeQuery(query, params);
      return { message: 'Vehicle added successfully', result };
    } catch (error) {
      throw new Error(`Error adding vehicle: ${error.message}`);
    }
  }

  async updateVehicle(id: string, updatedVehicleData: Partial<VehicleDataDto>) {
  console.log(id);
    const updatedFields = Object.keys(updatedVehicleData);

    if (updatedFields.length === 0) {
      return null; // No fields to update
    }

    const updateClause = updatedFields.map((field, index) => {
      return `${field} = ?`;
    });

    const query = `
      UPDATE vehicle
      SET
        ${updateClause.join(', ')}
      WHERE vehicle_id = ?
    `;
    console.log(query);
    const values = [
      ...updatedFields.map((field) => updatedVehicleData[field]),
      id,
    ];
    const updatedVehicle = await this.databaseService.executeQuery(
      query,
      values,
    );

    return updatedVehicle;
  }

  async deleteVehicle(id: string) {
    const query = `
      DELETE FROM vehicle
      WHERE vehicle_id = ?
    `;

    const values = [id];

    // Execute the DELETE statement
    const deletionResult = await this.databaseService.executeQuery(
      query,
      values,
    );

    if (deletionResult.affectedRows > 0) {
      return { message: 'Vehicle deleted successfully' };
    } else {
      return { error: 'Vehicle not found or could not be deleted' };
    }
  }

  // You can add more methods for fetching or querying vehicles as needed.
}
