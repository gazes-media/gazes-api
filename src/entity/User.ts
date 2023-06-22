import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Anime } from "./Anime"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    googleId: string
    
    @OneToMany(() => Anime, anime => anime.generatedId)
    history: Anime[]
}
