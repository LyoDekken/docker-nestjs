import { Role } from '@prisma/client';

export class User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  role: Role;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
