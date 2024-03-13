import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class ProductDto {
  @IsString()
  @IsNotEmpty()
  private name: string;

  @IsNumber()
  @IsNotEmpty()
  private price: number;

  @IsString()
  @IsNotEmpty()
  private description: string;

  @IsString()
  @IsNotEmpty()
  private type: string;

  @IsString()
  @IsNotEmpty()
  private img: string;

  @IsNumber()
  @IsNotEmpty()
  private sizeId: string;
}
