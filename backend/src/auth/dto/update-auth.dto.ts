import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ValidRoles } from '../interfaces';

export class UpdateAuthDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @IsEnum(ValidRoles, { each: true })
  @IsOptional()
  roles?: ValidRoles[];
}
