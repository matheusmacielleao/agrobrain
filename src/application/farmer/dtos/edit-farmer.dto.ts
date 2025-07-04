import { IsNotEmpty } from 'class-validator';

export class EditFarmerDto {
  @IsNotEmpty()
  name: string;
}
