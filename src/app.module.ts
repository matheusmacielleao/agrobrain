import { Module } from '@nestjs/common';
import { FarmerModule } from './application/farmer/farmer.module';

@Module({
  imports: [FarmerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
