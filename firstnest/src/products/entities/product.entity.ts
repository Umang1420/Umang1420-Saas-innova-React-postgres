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
   
  @ManyToMany(() => Users, (user) => user.product)
    users: Users[];
}
