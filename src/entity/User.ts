import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Anime } from "./Anime";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    googleId: string;

    @OneToMany(() => Anime, (anime) => anime.generatedId)
    history: Anime[];

    @OneToMany(() => Favoris, (favoris) => favoris.id)
    favoris: Favoris[];
}

@Entity()
export class Favoris {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.googleId)
    user: User;

    @Column()
    animeId: number;
}
