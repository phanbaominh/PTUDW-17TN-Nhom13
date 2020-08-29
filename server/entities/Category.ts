import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Book } from "./Book";

@Entity({ name: "categories" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  position: number;

  @Column()
  image: string;

  @OneToMany((type) => Book, (book) => book.category)
  books: Book[];

  static getAllWithBooks(): Promise<Category[]> {
    return Category.createQueryBuilder("category")
      .leftJoinAndSelect("category.books", "book")
      .getMany();
  }
}
