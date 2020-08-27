import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "book_requests" })
export default class BookRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.bookRequests)
  @JoinColumn({ name: "username" })
  user: User;

  @Column({ name: "book_title" })
  bookTitle: string;

  @Column({ name: "book_author" })
  bookAuthor: string;

  @Column({ name: "book_published_year" })
  bookPublishedYear: number;

  @Column({ name: "is_done" })
  isDone: boolean;

  static async getAll() {
    return this.createQueryBuilder("request")
      .leftJoinAndSelect("request.user", "user")
      .orderBy("id", "ASC")
      .getMany();
  }
}
