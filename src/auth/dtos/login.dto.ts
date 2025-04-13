/**
 * DTO pour la connexion
 * @module LoginDto
 * @description Définit la structure des données pour la connexion
 */

import { IsEmail, IsString } from "class-validator";

/**
 * @class LoginDto
 * @description DTO qui valide les données de connexion
 */
export class LoginDto 
{
    /**
     * @property {string} email - Email de l'utilisateur
     * @decorator @IsEmail()
     */
    @IsEmail()
    email: string

    /**
     * @property {string} password - Mot de passe de l'utilisateur
     * @decorator @IsString()
     */
    @IsString()
    password: string
}