import "reflect-metadata";
import { Entity, Column, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Anime {
    @PrimaryGeneratedColumn()
    generatedId: number;

    @Column()
    id: number;

    @ManyToOne(() => User, (user) => user.googleId)
    user: User;

    @Column()
    episode: number;

    @Column()
    duration: number;

    @Column()
    time: number;

    @Column()
    date: Date;
}
