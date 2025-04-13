import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //** POST Signup 
  @Post('signup') // auth/signup
  async signUp(@Body() signupData: SignupDto) {
    return this.authService.signUp(signupData);
  }

   //** POST login 
   @Post('login') // auth/signup
   async login(@Body() credentials: LoginDto) {
     return this.authService.login(credentials);
   }

}
