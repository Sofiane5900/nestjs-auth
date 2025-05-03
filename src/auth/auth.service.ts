/**
 * Service d'authentification
 * @module AuthService
 * @description Implémente la logique métier liée à l'authentification
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entity/refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';

/**
 * @class AuthService
 * @description Service qui gère :
 * - L'inscription des utilisateurs
 * - La connexion des utilisateurs
 * - La génération des tokens JWT
 */
@Injectable()
export class AuthService {
  /**
   * @constructor
   * @param {Repository<User>} userRepo - Repository pour l'accès aux utilisateurs
   * @param {JwtService} jwtService - Service pour la gestion des tokens JWT
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: RefreshToken

  ) {}

  /**
   * Inscription d'un nouvel utilisateur
   * @param {SignupDto} signupData - Données d'inscription
   * @returns {Promise<User>} Utilisateur créé
   * @throws {Error} Si l'email est déjà utilisé
   */
  async signUp(signupData: SignupDto) {
    const { email, password } = signupData;
    const existingUser = await this.userRepo.findOneBy({ email });
    if (existingUser) {
      throw new Error('Email déjà utilisé');
    }

    const hashedPassword = await argon.hash(password);

    const newUser = this.userRepo.create({
      email,
      password: hashedPassword,
    });

    return this.userRepo.save(newUser);
  }

  /**
   * Connexion d'un utilisateur
   * @param {LoginDto} credentials - Identifiants de connexion
   * @returns {Promise<{accessToken: string}>} Token d'accès
   * @throws {UnauthorizedException} Si les identifiants sont incorrects
   */
  async login(credentials: LoginDto) {
    const { email, password } = credentials;

    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException(
        "L'email ou le mot de passe est incorrect.",
      );
    }

    const passwordMatch = await argon.verify(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException(
        "L'email ou le mot de passe est incorrect.",
      );
    }

    return this.generateUserTokens(user.id);
  }

  /**
   * Génération des tokens JWT pour un utilisateur
   * @param {number} userId - Identifiant de l'utilisateur
   * @returns {Promise<{accessToken: string}>} Token d'accès
   */
  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshTokenRepo = uuidv4()
    return {
      accessToken,
      refreshTokenRepo
    };
  }
}
