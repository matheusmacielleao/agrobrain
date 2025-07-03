import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { FarmModel } from './farm.model';

@Entity()
export class FarmerModel {
  @PrimaryColumn()
  documentNumber: string;
  @Column()
  name: string;
  @OneToMany(() => FarmModel, (farm) => farm.farmer)
  farms: FarmModel[];
}
