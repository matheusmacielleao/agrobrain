import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateFarmerDto } from './dtos/create-farmer.dto';
import { FarmerService } from './farmer.service';
import { Response } from 'express';
import { InvalidDocumentError } from './errors/InvalidDocument';
import { DocumentAlreadyUsed } from './errors/DocumentAlreadyUsed';

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
  async getAllFarmers() {
    return this.farmerService.findAllFarmers();
  }
}
