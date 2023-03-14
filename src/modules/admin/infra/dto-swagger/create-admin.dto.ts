import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminSwagger {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do usuário.',
    example: 'Admin',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email do Usuário utilizado no login. Deve ser único',
    example: 'admin@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do user para login',
    example: 'Abc@1234',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha',
    example: 'Abc@1234',
  })
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'picture of person avatar',
    example:
      'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg',
  })
  avatar_url: string;
}
