import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import OrderProduct from './order-product.dto';

export default class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  public total: number;

  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  public cep: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public number: number;

  @IsString()
  @IsNotEmpty()
  public paymentType: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // validating all objects of my array
  @Type(() => OrderProduct)
  public products: OrderProduct[];
}
