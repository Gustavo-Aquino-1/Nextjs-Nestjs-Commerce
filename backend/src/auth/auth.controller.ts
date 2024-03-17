import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserDto from 'src/dto/user.dto';
import CreateUserDto from 'src/dto/create-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() user: UserDto) {
    return await this.authService.login(user);
  }

  @Post('/user')
  async create(@Body() user: CreateUserDto) {
    try {
      return await this.authService.create(user);
    } catch (error) {
      throw new ConflictException({ message: 'email already taken' });
    }
  }
}
