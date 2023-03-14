import { Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResetPasswordService } from 'src/modules/reset-password/services/reset-password.service';

@ApiTags('reset-password')
@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPassordService: ResetPasswordService) {}

  @Post()
  @ApiOperation({
    summary: 'Reseta a senha do usuário',
  })
  async resetPaasword(@Param('id') id: string) {
    return this.resetPassordService.generate(id);
  }
}
