import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import RecoverPasswordService from './recover.password.service';
import { Request } from 'express';

@Controller('/recover-password')
export default class RecoverPasswordController {
  constructor(private service: RecoverPasswordService) {}

  @Get()
  async recoverPassword(@Req() req: Request) {
    const { email } = req.query;
    return await this.service.recoverPassword(String(email));
  }

  @Post('/:id/:token')
  async resetPassword(@Body() data, @Req() req: Request) {
    const { id, token } = req.params;
    return await this.service.resetPassword(
      String(data.password),
      String(id),
      String(token),
    );
  }
}
