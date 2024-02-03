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

import { MaintenanceDataDto } from './dto/maintenance.dto';
import { MaintenanceService } from './maintenance.service';
import { DatabaseService } from 'src/database/database.service';

@Controller('maintenance')
@ApiTags('maintenance')
export class MaintenanceController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly maintenanceService: MaintenanceService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a new maintenance record' })
  @ApiCreatedResponse({
    description: 'The maintenance record has been successfully added.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async addMaintenance(@Body() maintenanceData: MaintenanceDataDto) {
    const query = `
      INSERT INTO maintenance (maintenance_id, maintain_date, description, cost, vehicle_id, maintenance_type_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      maintenanceData.maintenance_id,
      maintenanceData.maintain_date,
      maintenanceData.description,
      maintenanceData.cost,
      maintenanceData.vehicle_id,
      maintenanceData.maintenance_type_id,
    ];

    try {
      const result = await this.databaseService.executeQuery(query, params);
      return { message: 'Maintenance record added successfully', result };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Gets all maintenance records' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getAllMaintenance() {
    try {
      const query = 'SELECT * FROM maintenance';
      const results = await this.databaseService.executeQuery(query);
      return results;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Gets maintenance record by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async getMaintenanceById(@Param('id') id: string) {
    try {
      const query = `SELECT * FROM maintenance m where m.maintenance_id=${id}`;
      const results = await this.databaseService.executeQuery(query);
      return results;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update maintenance record by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiBody({ type: MaintenanceDataDto })
  async updateMaintenanceById(
    @Param('id') id: number,
    @Body() updatedMaintenanceData: Partial<MaintenanceDataDto>,
  ) {
    try {
      const updatedMaintenance =
        await this.maintenanceService.updateMaintenance(
          id,
          updatedMaintenanceData,
        );

      if (!updatedMaintenance) {
        return { error: 'No fields to update or maintenance record not found' };
      }

      return updatedMaintenance;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete maintenance record by ID' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async deleteMaintenanceById(@Param('id') id: string) {
    try {
      const deletionResult =
        await this.maintenanceService.deleteMaintenance(id);

      if (deletionResult.error) {
        console.log(deletionResult.error);
        return { error: deletionResult.error };
      }

      return { message: 'Maintenance record deleted successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }
}
