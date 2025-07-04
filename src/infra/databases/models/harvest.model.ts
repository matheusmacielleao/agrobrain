import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { FarmModel } from './farm.model';

@Entity()
export class HarvestModel {
  @PrimaryColumn()
  farmId: string;
  @PrimaryColumn()
  year: number;
  @PrimaryColumn()
  crop: string;
  @Column()
  plantedAreaHectares: number;
  @Column()
  farmAreaHectares: number;
  @ManyToOne(() => FarmModel, (farm) => farm.harvests)
  farm: FarmModel;
}
