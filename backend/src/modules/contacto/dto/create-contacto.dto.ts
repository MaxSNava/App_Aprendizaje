import { IsEmail, IsString } from 'class-validator';

export class CreateContactoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  mensaje: string;
}
