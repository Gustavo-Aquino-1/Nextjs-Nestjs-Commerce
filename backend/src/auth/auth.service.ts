import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserDto from 'src/dto/user.dto';
import prisma from 'src/prisma';

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
      acess_token: await this.jwt.signAsync(savedUser, {
        secret: '36fgd5f32fdf32hg9',
        expiresIn: '1h',
      }),
      refresh_token: await this.jwt.signAsync(savedUser, {
        secret: '36fgd5f32fdf32hg8',
        expiresIn: '1h',
      }),
    };
  }
}
