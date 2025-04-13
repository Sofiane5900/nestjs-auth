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
      database: 'db.sqlite',
      entities: [User], // ? Peut étre ajouter le directory "entity" directement ? 
      synchronize: true, // ! Ne pas utiliser en PROD, auto-sync les changements
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
