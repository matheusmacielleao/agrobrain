import { Repository } from 'typeorm';
import { FarmerModel } from '../../infra/databases/models/farmer.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class FarmerRepository {
  constructor(
    @InjectRepository(FarmerModel)
    private readonly typeormRepo: Repository<FarmerModel>,
  ) {}
  async create(documentNumber: string, name: string): Promise<FarmerModel> {
    return this.typeormRepo.save({ documentNumber, name });
  }
  async findOneByDocumentNumber(
    documentNumber: string,
  ): Promise<FarmerModel | null> {
    return this.typeormRepo.findOneBy({ documentNumber });
  }
  async findAll() {
    return this.typeormRepo.find({
      select: { documentNumber: true, name: true },
    });
  }
}
