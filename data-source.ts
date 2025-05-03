import 'reflect-metadata';
import 'sqlite3';
import { DataSource } from 'typeorm';
import { User } from './src/auth/entity/user.entity';
import { RefreshToken } from './src/auth/entity/refresh-token.entity';


export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User, RefreshToken],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});