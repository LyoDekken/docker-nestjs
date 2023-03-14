import { Injectable } from '@nestjs/common';
import { UserToken } from '@prisma/client';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';

@Injectable()
export class ResetPasswordService {
  private userToken = {
    id: true,
    token: true,
    user_id: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  public async findByToken(token: string): Promise<UserToken> {
    const userToken = await this.prisma.userToken.findUnique({
      where: { id: token },
      select: this.userToken,
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.prisma.userToken.create({
      data: {
        token: user_id,
        user_id,
      },
    });

    return userToken;
  }
}
