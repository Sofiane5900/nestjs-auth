import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User],
      synchronize: true, // ! Ne pas utiliser en PROD, auto-sync les changements
    })
    , AuthModule // Import du module d'authentification
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
