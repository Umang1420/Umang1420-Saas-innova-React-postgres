import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Name } from "../names/entities/name.entity.js"

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    username!: string

    @Column()
    passwordHash!: string

    @Column({default:'user'})
    role!: string

    @OneToMany(() => Name, name => name.user)
    names!: Name[]
}
    