import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Users } from "../../users/user.entity.js"

@Entity()
export class Name {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({ unique: true })
    email!: string

    @Column()
    course!: string

    @ManyToOne(()=> Users, u => u.names)
    user!: Users
}
