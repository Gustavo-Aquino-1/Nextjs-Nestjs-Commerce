import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export default class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  private email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  private password: string;

  @IsString()
  @IsNotEmpty()
  @Length(2)
  private name: string;

  @IsString()
  @Length(2)
  @IsOptional()
  private role?: string;
}
