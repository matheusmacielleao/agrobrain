import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateFarmerDto {
  @IsNotEmpty()
  @IsString()
  @Length(9)
  documentNumber: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
