import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignupDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message:
          'Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule et 1 chiffre',
      })
     password: string; 
}