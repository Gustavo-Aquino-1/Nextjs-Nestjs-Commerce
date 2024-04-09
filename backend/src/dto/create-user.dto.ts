import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export default class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Length(2)
  public readonly name: string;

  @IsString()
  @Length(2)
  @IsOptional()
  public readonly role?: string;
}
