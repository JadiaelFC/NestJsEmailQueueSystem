import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 123, description: 'O ID do usuário', nullable: true })
  @IsOptional()
  @IsInt({ message: 'O ID deve ser um número inteiro' })
  readonly id: number | null;

  @ApiProperty({ example: 'João Silva', description: 'O nome do usuário' })
  @IsString({ message: 'O nome deve ser uma string' })
  readonly name: string;

  @ApiProperty({
    example: 'joao@example.com',
    description: 'O e-mail do usuário',
  })
  @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido' })
  readonly email: string;

  @ApiProperty({ example: 'senha123', description: 'A senha do usuário' })
  @IsString({ message: 'A senha deve ser uma string' })
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres' })
  readonly password: string;
}
