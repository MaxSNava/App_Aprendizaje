import { IsOptional, IsString } from 'class-validator';

export class CreateGrupoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
