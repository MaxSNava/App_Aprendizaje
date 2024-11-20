import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  nickname: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Invalid credentials provided',
  })
  password: string;
}
