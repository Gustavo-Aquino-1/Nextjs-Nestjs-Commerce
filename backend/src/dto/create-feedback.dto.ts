import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export default class CreateFeedbackDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  private rate: number;

  @IsString()
  @IsNotEmpty()
  private description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  private productId: number;
}
