import { Entity, PrimaryGeneratedColumn, Column } from "typeorm/browser";
@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;
}
