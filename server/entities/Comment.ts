import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
  AfterLoad,
} from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity({ name: "comments" })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Book, (book) => book.comments)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn({ name: "username" })
  user: User;

  @ManyToOne((type) => Comment, (comment) => comment.replies)
  @JoinColumn({ name: "parent_id" })
  parent: Comment;

  @OneToMany((type) => Comment, (comment) => comment.parent)
  replies: Comment[];

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column()
  content: string;

  repliesCount: number;

  async setRepliesCount() {
    this.repliesCount = await Comment.createQueryBuilder("comment")
      .where("comment.parent_id = :id", { id: this.id })
      .getCount();
  }
  static getReplies(id: number): Promise<Comment[]> {
    return Comment.createQueryBuilder("comment")
      .where("comment.parent_id = :id", { id })
      .leftJoinAndSelect("comment.user", "user")
      .getMany();
  }
}
