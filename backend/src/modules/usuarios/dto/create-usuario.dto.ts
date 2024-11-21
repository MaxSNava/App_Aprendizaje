import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsUUID('4', { each: true }) // si es opcional, cada uno debe ser un UUID v4
  grupos?: string[];
}
