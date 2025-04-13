import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) // ** On injecte le repo, pas l'entité
        private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    // ** Inscription
    // On utilise le DTO pour la validation
    async signUp(signupData: SignupDto)
    {
        const { email, password } = signupData;
        // Verification Email
        const existingUser = await this.userRepo.findOneBy({email});
        if(existingUser) {
            throw new Error('Email déjà utilisé')
        }

        //  Hashage Mot de passe
        const hashedPassword = await bcrypt.hash(password,10);

        //  Crée l'utilisateur et le sauvegarde
        const newUser = this.userRepo.create({
            email,
            password: hashedPassword
        });

        return this.userRepo.save(newUser);

    }

     // ** Connexion
     async login(credentials: LoginDto) {
        const {email, password} = credentials

        // Verification Email
        // ? Message identique pour email ou mdp erronée (zero knowledge)
        const user = await this.userRepo.findOneBy({email});
        if(!user) {
            throw new UnauthorizedException("L'email ou le mot de passe est incorrect.")
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch) {
            throw new UnauthorizedException("L'email ou le mot de passe est incorrect.")
        }

        return {
            message: 'Succès !'
        }
     }


    // ** Géneration du token JWT
     async generateUserTokens(userId)
     {
         const accessToken = this.jwtService.sign({userId}, {expiresIn: '1H'})

         return {
            accessToken
         }
     }

}

