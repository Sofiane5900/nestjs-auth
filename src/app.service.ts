/**
 * Service principal de l'application
 * @module AppService
 * @description Fournit les fonctionnalités principales de l'application
 */

import { Injectable } from '@nestjs/common';

/**
 * @class AppService
 * @description Service qui implémente la logique métier principale
 */
@Injectable()
export class AppService {
  /**
   * Retourne un message de bienvenue
   * @returns {string} Message de bienvenue
   */
  getHello(): string {
    return 'Hello World!';
  }
}
