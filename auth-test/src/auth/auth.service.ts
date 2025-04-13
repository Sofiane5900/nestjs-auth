import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) // ** On injecte le repo, pas l'entité
        private readonly userRepo: Repository<User>,
    ) {}

    async signUp(email: string, password: string)
    {
        // ** Verification Email
        const existingUser = await this.userRepo.findOneBy({email});
        if(existingUser) {
            throw new Error('Email déjà utilisé')
        }

        // ** Hashage Mot de passe
        const hashedPassword = bcrypt.hash(password,10);



    }
}

