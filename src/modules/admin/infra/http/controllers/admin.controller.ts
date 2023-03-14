import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from 'src/modules/admin/services/admin.service';
import { CreateAdminSwagger } from '../../dto-swagger/create-admin.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({
    summary: 'Cadastrar um Admin',
  })
  async createUser(@Body() data: CreateAdminSwagger) {
    return this.adminService.createAdmin(data);
  }
}
