import { Repository } from 'typeorm';
import { HarvestModel } from '../../infra/databases/models/harvest.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FarmModel } from 'src/infra/databases/models/farm.model';
@Injectable()
export class HarvestRepository {
  constructor(
    @InjectRepository(HarvestModel)
    private readonly typeormRepo: Repository<HarvestModel>,
  ) {}
  async create(
    farm: FarmModel,
    year: number,
    crop: string,
    plantedAreaHectares: number,
  ): Promise<HarvestModel> {
    return this.typeormRepo.save({
      farmId: farm.id,
      farm,
      year,
      crop,
      plantedAreaHectares,
      farmAreaHectares: farm.utilAreaHectares,
    });
  }
  async findOne(
    farmId: string,
    year: number,
    crop: string,
  ): Promise<HarvestModel | null> {
    return this.typeormRepo.findOneBy({ farm: { id: farmId }, year, crop });
  }

  async findYearHarvest(
    farmId: string,
    year: number,
  ): Promise<HarvestModel[] | null> {
    return this.typeormRepo.findBy({ farm: { id: farmId }, year });
  }

  async findAllHarvestFromFarm(farmId: string): Promise<HarvestModel[] | null> {
    return this.typeormRepo.findBy({ farm: { id: farmId } });
  }
}
