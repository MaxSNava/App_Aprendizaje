import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { GruposModule } from './modules/grupos/grupos.module';
import { PruebasModule } from './modules/pruebas/pruebas.module';
import { ContactoModule } from './modules/contacto/contacto.module';
import { CommonModule } from './common/common.module';
import { ReporteModule } from './modules/reporte/reporte.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    GruposModule,
    UsuariosModule,
    PruebasModule,
    ContactoModule,
    CommonModule,
    ReporteModule,
  ],
})
export class AppModule {}
