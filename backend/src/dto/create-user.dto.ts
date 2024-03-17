import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

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
  private role: string;
}
