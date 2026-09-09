import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;
}
