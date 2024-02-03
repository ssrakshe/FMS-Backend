import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private connection;

  constructor() {
    this.connection = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'admin', //Replace with your own password 
      database: 'fleet_management',
    });
  }

  async executeQuery(query: string, params?: any[]) {
    const [rows, fields] = await this.connection.query(query, params);
    return rows;
  }

  async callAddTripProcedure(
    trip_id: number,
    start_date: Date,
    end_date: Date,
    distance: number,
    fuel_expense: number,
    vehicle_id: string,
    driver_id: number,
    trip_type_id: number,
  ) {
    const procedureName = 'AddTrip';
    const query = `
      CALL ${procedureName}(?, ?, ?, ?, ?, ?, ?, ?);
    `;

    try {
      const [results, fields] = await this.connection.query(query, [
        trip_id,
        start_date,
        end_date,
        distance,
        fuel_expense,
        vehicle_id,
        driver_id,
        trip_type_id,
      ]);

      return results;
    } catch (error) {
      throw new Error(`Error calling stored procedure: ${error.message}`);
    }
  }
}
