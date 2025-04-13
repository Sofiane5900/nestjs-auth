/**
 * DTO pour l'inscription
 * @module SignupDto
 * @description Définit la structure des données pour l'inscription
 */

import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

/**
 * @class SignupDto
 * @description DTO qui valide les données d'inscription
 */
export class SignupDto {
    /**
     * @property {string} email - Email de l'utilisateur
     * @decorator @IsEmail()
     */
    @IsEmail()
    email: string;

    /**
     * @property {string} password - Mot de passe de l'utilisateur
     * @decorator @IsString()
     * @decorator @MinLength(8)
     * @decorator @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
     */
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message:
          'Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule et 1 chiffre',
    })
    password: string;
}