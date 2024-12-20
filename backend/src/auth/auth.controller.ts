import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto, UpdateAuthDto } from './dto';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.getUserById(id);
  }

  @Get()
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAuthDto: UpdateAuthDto,
  ) {
    return this.authService.updateUser(id, updateAuthDto);
  }

  @Patch(':id/activate')
  @Auth(ValidRoles.superUser)
  toggleActive(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.toggleActive(id);
  }

  @Delete(':id')
  @Auth(ValidRoles.superUser)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.deleteUser(id);
  }
}
