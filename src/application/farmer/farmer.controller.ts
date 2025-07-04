import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateFarmerDto } from './dtos/create-farmer.dto';
import { FarmerService } from './farmer.service';
import { Response } from 'express';
import { InvalidDocumentError } from './errors/InvalidDocument';
import { DocumentAlreadyUsed } from './errors/DocumentAlreadyUsed';
import { FarmerNotFound } from './errors/FarmerNotFound';
import { EditFarmerDto } from './dtos/edit-farmer.dto';
import { FarmerModel } from 'src/infra/databases/models/farmer.model';

@Controller('/farmers')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}
  @Post()
  async createFarmer(
    @Body() createFarmerDto: CreateFarmerDto,
    @Res() response: Response,
  ) {
    const result = await this.farmerService.createFarmer(
      createFarmerDto.documentNumber,
      createFarmerDto.name,
    );

    if (
      result instanceof InvalidDocumentError ||
      result instanceof DocumentAlreadyUsed
    ) {
      return response.status(400).send({ message: result.message });
    }
    return response.status(201).send(result);
  }
  @Get()
  async getAllFarmers(): Promise<FarmerModel[]> {
    return this.farmerService.findAllFarmers();
  }
  @Delete('/:documentNumber')
  async deleteFarmer(
    @Res() response: Response,
    @Param('documentNumber') documentNumber: string,
  ) {
    const result = await this.farmerService.deleteFarmer(documentNumber);

    if (result instanceof FarmerNotFound) {
      return response.status(400).send({ message: result.message });
    }
    return response.status(204).send();
  }

  @Patch('/:documentNumber')
  async updateFarmer(
    @Res() response: Response,
    @Param('documentNumber') documentNumber: string,
    @Body() editFarmerDto: EditFarmerDto,
  ) {
    const result = await this.farmerService.updateFarmer(
      documentNumber,
      editFarmerDto.name,
    );

    if (result instanceof InvalidDocumentError) {
      return response.status(400).send({ message: result.message });
    }
    if (result instanceof FarmerNotFound) {
      return response.status(404).send({ message: result.message });
    }
    return response.status(200).send(result);
  }
}
