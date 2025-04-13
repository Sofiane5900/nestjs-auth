/**
 * Entité Utilisateur
 * @module User
 * @description Représente un utilisateur dans la base de données
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @class User
 * @description Entité qui représente un utilisateur dans la base de données
 * @decorator @Entity()
 */
@Entity()
export class User {
    /**
     * @property {string} id - Identifiant unique généré automatiquement (UUID)
     * @decorator @PrimaryGeneratedColumn('uuid')
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * @property {string} email - Adresse email de l'utilisateur
     * @decorator @Column()
     */
    @Column()
    email: string;

    /**
     * @property {string} password - Mot de passe hashé de l'utilisateur
     * @decorator @Column()
     */
    @Column()
    password: string;
}