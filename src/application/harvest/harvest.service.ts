import { Injectable } from '@nestjs/common';
import { HarvestRepository } from './harvest.repo';
import { FarmRepository } from '../farm/farm.repository';

@Injectable()
export class HarvestService {
  constructor(
    private readonly farmRepo: FarmRepository,
    private readonly harvestRepo: HarvestRepository,
  ) {}
  async create(
    farmId: string,
    year: number,
    crop: string,
    plantedAreaHectares: number,
  ) {
    const farm = await this.farmRepo.findOneById(farmId);
    if (!farm) {
      return new Error('Farm Not Found');
    }
    const cropAtHarvestAlreadyExists = await this.harvestRepo.findOne(
      farmId,
      year,
      crop,
    );

    if (cropAtHarvestAlreadyExists) {
      return new Error('Crop Already Registered, Update or Delete');
    }

    return this.harvestRepo.create(farm, year, crop, plantedAreaHectares);
  }
  async getHarvest(farmId: string, year: number) {
    return this.harvestRepo.findYearHarvest(farmId, year);
  }
  async getHarvestsFromFarm(farmId: string) {
    return this.harvestRepo.findAllHarvestFromFarm(farmId);
  }
}
