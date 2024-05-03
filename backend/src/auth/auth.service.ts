import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserDto from 'src/dto/user.dto';
import prisma from 'src/prisma';
import 'dotenv/config';
import CreateUserDto from 'src/dto/create-user.dto';

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

  async create(user: CreateUserDto) {
    return await prisma.user.create({
      data: { ...user } as any,
    });
  }

  async refresh(refreshToken: string) {
    try {
      const data = this.jwt.decode(refreshToken);
      const user = await prisma.user.findFirst({
        where: { id: data.id },
      });
      const newToken = await this.jwt.signAsync(user, {
        secret: JWT_SECRET_ACESS_TOKEN,
        expiresIn: JWT_EXPIRES_ACESS_TOKEN,
      });
      return { refreshToken: newToken };
    } catch (error) {
      throw new UnauthorizedException({ message: error.message });
    }
  }

  async newPassword(id: string, password: string, pastPassword: string) {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (pastPassword != user.password) {
      throw new BadRequestException({ message: 'Wrong past password' });
    }

    await prisma.user.update({
      where: { id },
      data: {
        password,
      },
    });
  }

  async getUser(id: string) {
    return await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });
  }
}
