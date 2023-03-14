import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { CreateUserSwagger } from '../infra/dto-swagger/create-user.dto';
import { User } from '../infra/entities/user.entity';
import * as bcrypt from 'bcrypt';
import IUserRepository from '../repositories/IUserRepository';
import { Role } from '@prisma/client';
import { handleError } from 'src/shared/utils/handle-error.util';
import { UpdateUserSwaggerDto } from '../infra/dto-swagger/update-user.dto';

@Injectable()
export class UserService implements IUserRepository {
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

  async createUser(data: CreateUserSwagger): Promise<User> {
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
          role: Role.user,
          avatar_url: data.avatar_url,
        },
        select: this.userSelect,
      })
      .catch(handleError);

    return user;
  }

  async findAllUser(): Promise<User[]> {
    const users = await this.prisma.user
      .findMany({
        select: this.userSelect,
      })
      .catch(handleError);

    if (users.length === 0) {
      throw new NotFoundException('Nenhum usuário encontrado!');
    }

    return users;
  }

  async findOneUser(id: string): Promise<User> {
    const user = await this.prisma.user
      .findUnique({
        where: { id },
        select: this.userSelect,
      })
      .catch(handleError);

    if (!user) {
      throw new NotFoundException(`Usuário com ID '${id}' não encontrado!`);
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserSwaggerDto): Promise<User> {
    await this.findOneUser(id);

    const user = await this.prisma.user
      .update({
        where: { id },
        data: {
          name: data.name,
          email: data.email,
          avatar_url: data.avatar_url,
        },
        select: this.userSelect,
      })
      .catch(handleError);

    return user;
  }

  async deleteUser(id: string): Promise<any> {
    await this.findOneUser(id);

    await this.prisma.user
      .delete({
        where: { id },
      })
      .catch(handleError);

    return { message: `Usuário com ID '${id}' deletado com sucesso!` };
  }
}
