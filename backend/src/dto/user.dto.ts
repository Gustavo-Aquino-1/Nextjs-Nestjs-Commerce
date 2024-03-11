import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export default class UserDto {
  @IsEmail()
  @IsNotEmpty()
  private email: string;

  @IsNotEmpty()
  @Length(8)
  private password: string;
}
