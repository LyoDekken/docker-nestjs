import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { handleError } from 'src/shared/utils/handle-error.util';
import { CreateAdminSwagger } from '../infra/dto-swagger/create-admin.dto';
import IAdminRepository from '../repositories/IAdminRepository';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService implements IAdminRepository {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
    avatar_url: false,
    password: false,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(data: CreateAdminSwagger): Promise<User> {
    if (data.password != data.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete data.confirmPassword;

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user
      .create({
        data: {
          name: data.name,
          email: data.email,
          password: hashPassword,
          role: Role.admin,
          avatar_url: data.avatar_url,
        },
        select: this.userSelect,
      })
      .catch(handleError);

    return user;
  }
}
