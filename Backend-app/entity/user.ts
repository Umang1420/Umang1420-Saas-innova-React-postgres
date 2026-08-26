import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar" })
    firstName!: string


    @Column({ type: "varchar" })
    lastName!: string

    @Column({ type: "boolean" })
    isActive!: boolean
}

@Entity()
export class Product{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({type  : "varchar"})
    title!: string

    @Column({type  : "int"})
    price!: number

    @Column({type  : "varchar"})
    description!: string

    @Column({type : "boolean"})
    isActive!: boolean

    @CreateDateColumn()
    CreatedAt!: Date
}