import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Users } from "../../users/entities/user.js";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  createdBy: number;

  @ManyToMany(() => Users, (user) => user.product)
  users: Users[];
}
