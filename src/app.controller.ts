import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Controller('/driver')
export class AppController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async getAllDrivers() {
    const query = 'SELECT * FROM Driver';
    const results = await this.databaseService.executeQuery(query);
    return results;
  }
}
