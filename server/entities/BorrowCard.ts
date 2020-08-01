import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

export enum BorrowStatus {
  CANCELED = "canceled",
  REQUESTED = "requested",
  BORROWED = "borrowed",
  RETURNED = "returned",
  FOLLOWED = "followed",
}

@Entity({name: "borrow_cards"})
export class BorrowCard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Book, book => book.borrowCards)
  @JoinColumn({name: "book_id"})
  book: Book;

  @ManyToOne(type => User, user => user.borrowCards)
  @JoinColumn({name: "username"})
  user: User;

  @Column()
  status: BorrowStatus;

  @Column({name: "created_at"})
  createdAt: Date;

  static getBorrowText(status, bookCount) {
    switch (status) {
      case BorrowStatus.REQUESTED:
        return "Hủy mượn";
      case BorrowStatus.FOLLOWED:
        return "Hủy theo dõi";
      case BorrowStatus.BORROWED:
        return "Đang mượn";
      default:
        return bookCount > 0 ? "Mượn" : "Theo dõi";
    }
  }

  static getBorrowRef(status: BorrowStatus, bookId: number) {
    switch (status) {
      case BorrowStatus.REQUESTED:
      case BorrowStatus.FOLLOWED:
        return `/books/${bookId}/borrows?_method=DELETE`;
      default:
        return `/books/${bookId}/borrows/`;
    }
  }

  static getBorrowForm(status: BorrowStatus, bookId: number, bookCount: number): string{
    let isDisabled = "";
    if (status === BorrowStatus.BORROWED) isDisabled ="disabled";
    return `
    <form class="delete-form" action="${BorrowCard.getBorrowRef(status, bookId)}" method="post" class="inline-block">
      <button type="submit" ${isDisabled} class="text-white bg-indigo-500 border-0 py-1 px-4 xs:py-2 xs:px-6 focus:outline-none hover:bg-indigo-600 rounded">
        ${BorrowCard.getBorrowText(status, bookCount)}
      </button>
    </form>`;
  }
};
