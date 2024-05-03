import {
  Body,
  ConflictException,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import UserDto from 'src/dto/user.dto';
import CreateUserDto from 'src/dto/create-user.dto';
import IsAuthorized from 'src/guards/isAuthorized';
import decodeJwt from 'src/utils/decodeJwt';
import { Request } from 'express';

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

  @Post('/refresh')
  async refresh(@Body() data: { refresh: string }) {
    return await this.authService.refresh(data.refresh);
  }

  @UseGuards(new IsAuthorized())
  @Post('/new-password')
  async newPassword(
    @Body() data: { password: string; pastPassword: string },
    @Req() req: Request,
  ) {
    const { id } = decodeJwt(req) as any;
    console.log(data);
    return await this.authService.newPassword(
      id,
      data.password,
      data.pastPassword,
    );
  }
}
