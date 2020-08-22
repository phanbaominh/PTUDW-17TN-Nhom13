import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from "typeorm";
import { Book } from "./Book";

@Entity({ name: "tags" })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Book, (book) => book.tags)
  books: Book[];
}
