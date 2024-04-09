import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import prisma from 'src/prisma';
import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { MailerService } from '@nestjs-modules/mailer';
import decodeJwt from 'src/utils/decodeJwt';

const { JWT_SECRET_PASSWORD } = process.env;

@Injectable()
export default class RecoverPasswordService {
  constructor(private mailerService: MailerService) {}

  async recoverPassword(email: string) {
    const foundUser = await prisma.user.findUnique({
      where: { email },
    });
    if (!foundUser)
      throw new NotFoundException({ message: 'user not registed' });
    const secret = JWT_SECRET_PASSWORD + foundUser.password + foundUser.id;
    const token = sign({ email: foundUser.email, id: foundUser.id }, secret, {
      expiresIn: '10m',
    });
    const link = `http://localhost:3000/recover/${foundUser.id}/${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'recover password',
      html: `<h1> Use this link to recover your password <h1/> <a href="${link}">Click here<a/>`,
    });
    return { message: 'The link was sent to your email' };
  }

  async resetPassword(password: string, id: string, token: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException({ message: 'user not registered' });

    try {
      verify(token, JWT_SECRET_PASSWORD + user.password + user.id);
      if (user.password == password)
        throw new BadRequestException({
          message: `your new password can't be equal than your past`,
        });
      await prisma.user.update({
        where: { id },
        data: { password },
      });
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
}
