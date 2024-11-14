import { IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePruebaDto {
  @IsString()
  @IsIn(['vark', 'mbti'])
  tipoPrueba: string;

  @IsUUID()
  @IsNotEmpty()
  usuarioId: string;
}
