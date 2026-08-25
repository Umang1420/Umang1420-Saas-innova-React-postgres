import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
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