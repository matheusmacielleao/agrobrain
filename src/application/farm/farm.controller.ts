import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dtos/create-farm.dto';
import { HarvestService } from '../harvest/harvest.service';
import { CreateHarvestDto } from '../harvest/dtos/create-harvest.dto';

@Controller('/farmers/:documentNumber/farms')
export class FarmController {
  constructor(
    private readonly farmService: FarmService,
    private readonly harvestService: HarvestService,
  ) {}
  @Get()
  async getAllFarmsFromFarmer(@Param('documentNumber') documentNumber: string) {
    return this.farmService.findAllFarmsFromFarmer(documentNumber);
  }
  @Post()
  async createFarm(
    @Param('documentNumber') documentNumber: string,
    @Body() payload: CreateFarmDto,
  ) {
    return this.farmService.create(documentNumber, {
      ...payload,
    });
  }
  @Get('/:farmId')
  async getOneFarm(@Param('farmId') farmId: string) {
    const farm = await this.farmService.findOneById(farmId);
    if (!farm) {
      return new HttpException('Farm Not Found', 404);
    }
    return farm;
  }
  @Post('/:farmId/harvests')
  async createHarvest(
    @Param('farmId') farmId: string,
    @Body() payload: CreateHarvestDto,
  ) {
    return this.harvestService.create(
      farmId,
      payload.year,
      payload.crop,
      payload.plantedAreaHectares,
    );
  }
  @Get('/:farmId/harvests/:harvestYear')
  async getHarvest(
    @Param('farmId') farmId: string,
    @Param('harvestYear') harvestYear: number,
  ) {
    return this.harvestService.getHarvest(farmId, harvestYear);
  }
  @Get('/:farmId/harvests')
  async getAllHarvests(@Param('farmId') farmId: string) {
    return this.harvestService.getHarvestsFromFarm(farmId);
  }
}
