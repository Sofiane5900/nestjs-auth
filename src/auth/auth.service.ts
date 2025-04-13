import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) // ** On injecte le repo, pas l'entité
        private readonly userRepo: Repository<User>,
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
        const user = await this.userRepo.findOneBy({email});
        if(!user) {
            throw new Error("Cette utilisateur n'éxiste pas.")
        }

     }

}

