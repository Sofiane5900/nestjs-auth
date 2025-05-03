/**
 * Module d'authentification
 * @module AuthModule
 * @description Gère toutes les fonctionnalités liées à l'authentification
 */

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { RefreshToken } from './entity/refresh-token.entity';

/**
 * @class AuthModule
 * @description Module qui configure :
 * - Le repository User pour l'accès à la base de données
 * - Le contrôleur d'authentification
 * - Le service d'authentification
 */
@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    RefreshToken
  ]),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
