/**
 * Contrôleur d'authentification
 * @module AuthController
 * @description Gère les endpoints liés à l'authentification
 */

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

/**
 * @class AuthController
 * @description Contrôleur qui gère les opérations d'authentification
 */
@Controller('auth')
export class AuthController {
  /**
   * @constructor
   * @param {AuthService} authService - Service d'authentification
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint d'inscription
   * @param {SignupDto} signupData - Données d'inscription
   * @returns {Promise<any>} Résultat de l'inscription
   */
  @Post('signup') // auth/signup
  async signUp(@Body() signupData: SignupDto) {
    return this.authService.signUp(signupData);
  }

  /**
   * Endpoint de connexion
   * @param {LoginDto} credentials - Identifiants de connexion
   * @returns {Promise<any>} Résultat de la connexion
   */
  @Post('login') // auth/signup
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }
}
