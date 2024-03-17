import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export default class OrderProduct {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  private productId: number;

  @IsString()
  @IsNotEmpty()
  private size: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  private quantity: number;
}
