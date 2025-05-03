/**
 * Module principal de l'application NestJS
 * @module AppModule
 * @description Module racine qui configure les dépendances principales de l'application
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { RefreshToken } from './auth/entity/refresh-token.entity';

/**
 * @class AppModule
 * @description Module principal qui configure :
 * - La configuration globale de l'application
 * - Le module JWT pour l'authentification
 * - La connexion à la base de données SQLite
 * - Le module d'authentification
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
      }),
      global: true,
      inject: [ConfigService]
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, RefreshToken],
      synchronize: true, // ! Ne pas utiliser en PROD, auto-sync les changements de la DB
    }),
    AuthModule // Import du module d'authentification
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
