import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Grupo } from '../grupos/entities/grupo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Grupo])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
