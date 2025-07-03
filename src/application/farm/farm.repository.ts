import { Repository } from 'typeorm';
import { FarmModel } from '../../infra/databases/models/farm.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FarmerModel } from 'src/infra/databases/models/farmer.model';
@Injectable()
export class FarmRepository {
  constructor(
    @InjectRepository(FarmModel)
    private readonly typeormRepo: Repository<FarmModel>,
  ) {}
  async create(
    farmer: FarmerModel,
    payload: CreateFarmerModel,
  ): Promise<FarmModel> {
    return this.typeormRepo.save({ ...payload, farmer });
  }
  async findOneById(id: string): Promise<FarmModel | null> {
    return this.typeormRepo.findOneBy({ id });
  }
  async findAllByFarmerDocument(farmerDocument: string): Promise<FarmModel[]> {
    return this.typeormRepo.find({
      where: { farmer: { documentNumber: farmerDocument } },
    });
  }
}

export interface CreateFarmerModel {
  name: string;
  city: string;
  state: string;
  totalAreaHectares: number;
  utilAreaHectares: number;
  vegetationAreaHectares: number;
}
