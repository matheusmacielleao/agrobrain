import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  state: string;
  @IsNumber()
  @IsNotEmpty()
  totalAreaHectares: number;
  @IsNumber()
  @IsNotEmpty()
  utilAreaHectares: number;
  @IsNumber()
  @IsNotEmpty()
  vegetationAreaHectares: number;
}
