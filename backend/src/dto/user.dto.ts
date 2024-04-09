import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export default class UserDto {
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @IsNotEmpty()
  @Length(8)
  public readonly password: string;
}
