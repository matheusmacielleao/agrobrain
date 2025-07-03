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

@Controller('/farmers/:documentNumber/farms')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}
  @Get()
  async getAllFarmsFromFarmer(@Param('documentNumber') documentNumber: string) {
    return this.farmService.findAllFarmsFromFarmer(documentNumber);
  }
  @Post()
  async createFarm(
    @Param('documentNumber') documentNumber: string,
    @Body() payload: CreateFarmDto,
  ) {
    console.log('createFarm', { documentNumber, payload });
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
}
