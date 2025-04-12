import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Regroupement d'informations concernant un Utilisateur.
 * Utilisé comme entité TypeORM avec SQLite.
 */

@Entity()
export class User {
    /**
     * Identifiant unique généré automatiquement (UUID).
     */
    @PrimaryGeneratedColumn('uuid')
    id: string


    /**
     * Adresse email de l'utilisateur. Doit être unique.
     */
    @Column()
    email: string

     /**
     * Mot de passe hashé de l'utilisateur.
     */
    @Column()
    password: string
}