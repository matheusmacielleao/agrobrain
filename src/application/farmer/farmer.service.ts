import { FarmerRepository } from './farmer.repository';
import { FarmerModel } from '../../infra/databases/models/farmer.model';
import { Injectable } from '@nestjs/common';
import { ValidateDocument } from '../../domain/usecases/validate-document.usecase';
import { InvalidDocumentError } from './errors/InvalidDocument';
import { DocumentAlreadyUsed } from './errors/DocumentAlreadyUsed';
@Injectable()
export class FarmerService {
  constructor(private readonly farmerRepo: FarmerRepository) {}
  async createFarmer(
    documentNumber: string,
    name: string,
  ): Promise<FarmerModel | InvalidDocumentError | DocumentAlreadyUsed> {
    if (!ValidateDocument.exec(documentNumber)) {
      return new InvalidDocumentError();
    }
    const documentNumberAlreadyExists =
      await this.farmerRepo.findOneByDocumentNumber(documentNumber);
    if (documentNumberAlreadyExists) {
      return new DocumentAlreadyUsed(documentNumber);
    }

    const newFarmerModel = await this.farmerRepo.create(documentNumber, name);

    return newFarmerModel;
  }

  async findAllFarmers(): Promise<FarmerModel[]> {
    return await this.farmerRepo.findAll();
  }
}
