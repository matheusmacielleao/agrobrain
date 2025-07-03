import { FarmerNotFound } from '../farmer/errors/FarmerNotFound';
import { FarmerRepository } from '../farmer/farmer.repository';
import { CreateFarmDto } from './dtos/create-farm.dto';
import { FarmRepository } from './farm.repository';
import { AreaValuesInvalidError } from './errors/AreaValuesInvalidError';
import { FarmModel } from 'src/infra/databases/models/farm.model';
import { Injectable } from '@nestjs/common';
@Injectable()
export class FarmService {
  constructor(
    private readonly farmerRepository: FarmerRepository,
    private readonly farmRepository: FarmRepository,
  ) {}

  async create(
    farmerDocument: string,
    createFarmDto: CreateFarmDto,
  ): Promise<FarmModel | FarmerNotFound | AreaValuesInvalidError> {
    const farmer =
      await this.farmerRepository.findOneByDocumentNumber(farmerDocument);
    if (!farmer) {
      return new FarmerNotFound(farmerDocument);
    }

    if (
      createFarmDto.totalAreaHectares <
      createFarmDto.utilAreaHectares + createFarmDto.vegetationAreaHectares
    ) {
      return new AreaValuesInvalidError();
    }

    const newFarm = await this.farmRepository.create(farmer, {
      ...createFarmDto,
    });

    return newFarm;
  }

  async findAllFarmsFromFarmer(farmerDocument: string): Promise<FarmModel[]> {
    return this.farmRepository.findAllByFarmerDocument(farmerDocument);
  }

  async findOneById(farmId: string): Promise<FarmModel | null> {
    return this.farmRepository.findOneById(farmId);
  }
}
