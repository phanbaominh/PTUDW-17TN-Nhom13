import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import moment from "moment";
import { Book } from "./Book";
import { User } from "./User";

export enum NotiType {
  DUE = "due",
  AVAILABLE = "available",
}

@Entity({ name: "notifications" })
export default class UserNotification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Book, (book) => book.notifications, { eager: true })
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne((type) => User, (user) => user.notifications)
  @JoinColumn({ name: "username" })
  user: User;

  @Column()
  content: string;

  @Column()
  type: NotiType;

  @Column({ name: "created_at" })
  createdAt: number;

  @Column()
  read: boolean;

  get createdTime() {
    let createdAt = moment(this.createdAt);
    return moment().to(createdAt);
  }
}
