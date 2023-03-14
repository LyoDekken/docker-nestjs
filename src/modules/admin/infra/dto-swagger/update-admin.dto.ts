import { PartialType } from '@nestjs/swagger';
import { CreateAdminSwagger } from './create-admin.dto';

export class UpdateAdminSwaggerDto extends PartialType(CreateAdminSwagger) {}
