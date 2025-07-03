import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HarvestModel } from './harvest.model';
import { FarmerModel } from './farmer.model';

@Entity()
export class FarmModel {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  city: string;
  @Column()
  state: string;
  @Column()
  totalAreaHectares: number;
  @Column()
  utilAreaHectares: number;
  @Column()
  vegetationAreaHectares: number;
  @ManyToOne(() => FarmerModel, (farmer) => farmer.farms)
  farmer: FarmerModel;
  @OneToMany(() => HarvestModel, (harvest) => harvest.farm)
  harvests: HarvestModel[];
}
