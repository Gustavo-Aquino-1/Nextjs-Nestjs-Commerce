import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserDto from 'src/dto/user.dto';
import prisma from 'src/prisma';
import 'dotenv/config';

const {
  JWT_SECRET_ACESS_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_EXPIRES_ACESS_TOKEN,
  JWT_EXPIRES_REFRESH_TOKEN,
} = process.env;

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}
  async login(user: UserDto) {
    const savedUser = await prisma.user.findFirst({
      where: { ...user },
    });

    if (!savedUser) throw new NotFoundException({ message: 'user not found' });

    // generate token
    // user id acess_token refresh_token

    delete savedUser.password;

    return {
      id: savedUser.id,
      name: savedUser.name,
      role: savedUser.role,
      acess_token: await this.jwt.signAsync(savedUser, {
        secret: JWT_SECRET_ACESS_TOKEN,
        expiresIn: JWT_EXPIRES_ACESS_TOKEN,
      }),
      refresh_token: await this.jwt.signAsync(savedUser, {
        secret: JWT_SECRET_REFRESH_TOKEN,
        expiresIn: JWT_EXPIRES_REFRESH_TOKEN,
      }),
    };
  }
}
