import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from "typeorm"

@Entity()
export class User {
    // TypeORM uses legacy decorators, while newer TypeScript versions check standard decorator signatures.
    // @ts-ignore
    @PrimaryGeneratedColumn()
    id!: number

    // @ts-ignore
    @Column({ type: "varchar" })
    firstName!: string

    // @ts-ignore
    @Column({ type: "varchar" })
    lastName!: string

    // @ts-ignore
    @Column({ type: "boolean" })
    isActive!: boolean
}

@Entity()
export class Product{
    // @ts-ignore
    @PrimaryGeneratedColumn()
    id!: number

    // @ts-ignore
    @Column({type  : "varchar"})
    title!: string

    // @ts-ignore
    @Column({type  : "int"})
    price!: number

    // @ts-ignore
    @Column({type  : "varchar"})
    description!: string

    // @ts-ignore
    @Column({ type: "boolean" })
    isActive!: boolean

    // @ts-ignore
    @CreateDateColumn()
    CreatedAt!: Date
}