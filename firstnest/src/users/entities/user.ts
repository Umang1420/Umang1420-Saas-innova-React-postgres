import {Entity , PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm'
import { Products } from '../../products/entities/product.entity.js'

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'user_email' })
    userEmail: string

    @Column()
    password: string

    @Column()
    refreshToken: string

    @Column({default: 'user'})
    role: string

    @ManyToMany(() => Products, (product) => product.users, { cascade: true }) 
    @JoinTable({ name: 'users_products_products' })
    product : Products[]

}