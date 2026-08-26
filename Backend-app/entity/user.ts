import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from "typeorm"

@Entity()
export class Usere {
    
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar" , name : "first_name" })
    firstName!: string


    @Column({ type: "varchar", name: "last_name" })
    lastName!: string

    @Column({ type: "boolean", name: "is_active"  })
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

    @OneToOne(()=>Usere)
    @JoinColumn()
    User!: Usere
}