import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { TripDataDto } from './dto/tripdata.dto';

@Injectable()
export class TripService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addTrip(
    trip_id: number, 
    start_date: Date,
    end_date: Date,
    distance: number,
    fuel_expense: number,
    vehicle_id: string,
    driver_id: number,
    trip_type_id: number,
  ) {
    try {
      const result = await this.databaseService.callAddTripProcedure(
        trip_id, 
        start_date,
        end_date,
        distance,
        fuel_expense,
        vehicle_id,
        driver_id,
        trip_type_id,
      );
      return result;
    } catch (error) {
      throw new Error(`Error calling stored procedure: ${error.message}`);
    }
  }
  async updateTrip(id: string, updatedTripData: Partial<TripDataDto>) {
    const updatedFields = Object.keys(updatedTripData);

    if (updatedFields.length === 0) {
      return null; // No fields to update
    }

    const updateClause = updatedFields.map((field, index) => {
      return `${field} = ?`;
    });

    const query = `
      UPDATE trip
      SET
        ${updateClause.join(', ')}
      WHERE trip_id = ?
    `;

    const values = [
      ...updatedFields.map((field) => updatedTripData[field]),
      id,
    ];
    const updatedTrip = await this.databaseService.executeQuery(query, values);

    if (updatedTrip.affectedRows >= 1) {
      return { message: 'Sucessfully Edited Trip' };
    }
  }

  async deleteTrip(id: string) {
    const query = `
      DELETE FROM trip
      WHERE trip_id = ?
    `;

    const values = [id];

    // Execute the DELETE statement
    const deletionResult = await this.databaseService.executeQuery(
      query,
      values,
    );

    if (deletionResult.affectedRows > 0) {
      return { message: 'Trip deleted successfully' };
    } else {
      return { error: 'Trip not found or could not be deleted' };
    }
  }
}
