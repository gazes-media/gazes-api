import "reflect-metadata"
import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Anime {

    @PrimaryGeneratedColumn()
    generatedId: number
    
    @Column()
    id: number

    @OneToOne(() => User, user => user.id)
    user: User

    @Column()
    episode: number

    @Column()
    duration: number

    @Column()
    time: number

    @Column()
    date: Date
    
}
