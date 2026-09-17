import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm"
import { Users } from "../users/user.entity.js"

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    text!: string

    @CreateDateColumn()
    createdAt!: string

    @ManyToOne(() => Users, u => u.names)
    user!: Users
}
