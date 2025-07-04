import { FarmerRepository } from './farmer.repository';
import { FarmerModel } from '../../infra/databases/models/farmer.model';
import { Injectable } from '@nestjs/common';
import { ValidateDocument } from '../../domain/usecases/validate-document.usecase';
import { InvalidDocumentError } from './errors/InvalidDocument';
import { DocumentAlreadyUsed } from './errors/DocumentAlreadyUsed';
import { FarmerNotFound } from './errors/FarmerNotFound';
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

  async deleteFarmer(documentNumber: string): Promise<void | FarmerNotFound> {
    const farmer =
      await this.farmerRepo.findOneByDocumentNumber(documentNumber);
    if (!farmer) {
      return new FarmerNotFound(documentNumber);
    }
    await this.farmerRepo.deleteByDocumentNumber(documentNumber);
  }

  async updateFarmer(
    documentNumber: string,
    name: string,
  ): Promise<FarmerModel | InvalidDocumentError> {
    if (!ValidateDocument.exec(documentNumber)) {
      return new InvalidDocumentError();
    }

    const farmer =
      await this.farmerRepo.findOneByDocumentNumber(documentNumber);
    if (!farmer) {
      return new FarmerNotFound(documentNumber);
    }

    const updatedFarmer = await this.farmerRepo.update(documentNumber, {
      name,
    });

    return updatedFarmer;
  }
}
