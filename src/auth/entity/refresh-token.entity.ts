import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class RefreshToken
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string; // stock le token haché 

    @Column({type: 'datetime'})
    expiryDate: Date;

    @ManyToOne(() => User, user => user.refreshTokens)
    user: User;

}