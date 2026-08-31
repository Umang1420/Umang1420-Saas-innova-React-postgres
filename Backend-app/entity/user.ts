import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"

@Entity()
export class User2 {
    
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

    @ManyToMany(()=>User2)
    @JoinTable()
    User!: User2[]
}