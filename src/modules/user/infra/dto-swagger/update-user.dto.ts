import { PartialType } from '@nestjs/swagger';
import { CreateUserSwagger } from './create-user.dto';

export class UpdateUserSwaggerDto extends PartialType(CreateUserSwagger) {}
