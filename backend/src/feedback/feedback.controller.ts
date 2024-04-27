import {
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import FeedbackService from './feedback.service';
import CreateFeedbackDto from 'src/dto/create-feedback.dto';
import IsAuthorized from 'src/guards/isAuthorized';
import { Request } from 'express';
import decodeJwt from 'src/utils/decodeJwt';

@Controller('/feedback')
export default class FeedbackController {
  constructor(private service: FeedbackService) {}

  @Post()
  @UseGuards(new IsAuthorized())
  async create(@Req() req: Request, @Body() feedback: CreateFeedbackDto) {
    try {
      return await this.service.create(decodeJwt(req) as any, feedback);
    } catch (error) {
      throw new ConflictException({
        message: 'You already rated this product',
      });
    }
  }

  @Get('/:id')
  @UseGuards(new IsAuthorized())
  async isRated(@Req() req: Request) {
    const user = decodeJwt(req) as any;
    return this.service.isRated(user.id, +req.params.id);
  }

  @Get('/rates/:id')
  async getRates(@Param('id') id: number, @Req() req: Request) {
    const { skip } = req.query;
    return this.service.getRates(+id, Number(skip) || 0);
  }
}
