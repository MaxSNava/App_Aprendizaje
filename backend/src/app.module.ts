import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { GruposModule } from './modules/grupos/grupos.module';
import { PruebasModule } from './modules/pruebas/pruebas.module';
import { ContactoModule } from './modules/contacto/contacto.module';
import { CommonModule } from './common/common.module';
import { ReporteModule } from './modules/reporte/reporte.module';

@Module({
  imports: [AuthModule, UsuariosModule, GruposModule, PruebasModule, ContactoModule, CommonModule, ReporteModule],
})
export class AppModule {}
