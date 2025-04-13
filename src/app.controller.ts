/**
 * Contrôleur principal de l'application
 * @module AppController
 * @description Gère les routes principales de l'application
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * @class AppController
 * @description Contrôleur qui gère les endpoints principaux de l'application
 */
@Controller()
export class AppController {
  /**
   * @constructor
   * @param {AppService} appService - Service principal de l'application
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint de test principal
   * @returns {string} Message de bienvenue
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
