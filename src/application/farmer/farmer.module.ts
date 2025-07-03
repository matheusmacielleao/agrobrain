import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmerModel } from '../../infra/databases/models/farmer.model';
import { FarmerController } from './farmer.controller';
import { FarmerService } from './farmer.service';
import { FarmerRepository } from './farmer.repository';
import { FarmModel } from 'src/infra/databases/models/farm.model';
import { HarvestModel } from 'src/infra/databases/models/harvest.model';
import { ValidateDocument } from 'src/domain/usecases/validate-document.usecase';
import { FarmController } from '../farm/farm.controller';
import { FarmService } from '../farm/farm.service';
import { FarmRepository } from '../farm/farm.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'agrobrain',
      entities: [FarmerModel, FarmModel, HarvestModel],
      synchronize: true,
      // dropSchema: true,
    }),

    TypeOrmModule.forFeature([FarmerModel, FarmModel]),
  ],
  controllers: [FarmerController, FarmController],
  providers: [
    ValidateDocument,
    FarmerService,
    FarmerRepository,
    FarmService,
    FarmRepository,
  ],
})
export class FarmerModule {}
