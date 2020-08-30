import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  SelectQueryBuilder,
} from "typeorm";
import { Book } from "./Book";
import { User } from "./User";
import moment from "moment";
import UserNotification, { NotiType } from "./UserNotification";

export enum BorrowStatus {
  CANCELED = "canceled",
  REQUESTED = "requested",
  BORROWED = "borrowed",
  RETURNED = "returned",
  FOLLOWED = "followed",
}

export enum TrangThai {
  canceled = "Đã hủy",
  requested = "Yêu cầu mượn",
  borrowed = "Đang mượn",
  returned = "Đã trả sách",
  followed = "Theo dõi",
  overdue = "Quá hạn",
}
@Entity({ name: "borrow_cards" })
export class BorrowCard extends BaseEntity {
  static OVERDUE_DURATION = 14;
  static MAX_BORROWED = 2;
  static MAX_WAIT = 7;

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Book, (book) => book.borrowCards)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne((type) => User, (user) => user.borrowCards)
  @JoinColumn({ name: "username" })
  user: User;

  @Column()
  status: BorrowStatus;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "scheduled_at" })
  scheduledAt: Date;

  @Column({ name: "borrowed_at" })
  borrowedAt: Date;

  private static buildCardQuery(): SelectQueryBuilder<BorrowCard> {
    return BorrowCard.createQueryBuilder("card")
      .leftJoinAndSelect("card.user", "user")
      .leftJoinAndSelect("card.book", "book");
  }

  static getAllWithRelations(): Promise<BorrowCard[]> {
    return this.buildCardQuery()
      .leftJoinAndSelect("book.category", "cat")
      .where("card.status <> :status", { status: BorrowStatus.FOLLOWED })
      .getMany();
  }

  static async findOneWithBookCardRelations(id: number): Promise<BorrowCard> {
    const card = this.buildCardQuery()
      .leftJoinAndSelect("book.borrowCards", "cards")
      .where("card.id = :id", { id })
      .getOne();
    if (!card) throw `Không tìm thấy card với id ${id}`;
    return card;
  }

  static async findOneWithBookCatRelations(id: number): Promise<BorrowCard> {
    const card = this.buildCardQuery()
      .leftJoinAndSelect("book.category", "cat")
      .where("card.id = :id", { id })
      .getOne();
    if (!card) throw `Không tìm thấy card với id ${id}`;
    return card;
  }

  static getBorrowText(status, bookCount) {
    switch (status) {
      case BorrowStatus.REQUESTED:
        return "Hủy yêu cầu mượn";
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

  static getBorrowForm(
    status: BorrowStatus,
    bookId: number,
    bookCount: number,
    style = "",
  ): string {
    let isDisabled = status === BorrowStatus.BORROWED ? "disabled" : "";
    let action = BorrowCard.getBorrowRef(status, bookId);
    return `
    <form class="delete-form inline-block w-full" action="${action}" method="post">
      <button type="submit" ${isDisabled} class="${style} text-white bg-indigo-500 border-0 py-1 px-4 xs:py-2 xs:px-6 focus:outline-none hover:bg-indigo-600 rounded">
        ${BorrowCard.getBorrowText(status, bookCount)}
      </button>
    </form>`;
  }

  static async parseBorrowCard(raw: any, oldCard: BorrowCard | null): Promise<BorrowCard> {
    const card = oldCard || new BorrowCard();
    if (!oldCard) {
      card.user = await User.findOneOrFail(raw.username);
      card.createdAt = new Date();
    }
    const oldStatus = card.status;
    card.status = raw.status;
    card.changeBookCount(oldStatus);
    return card;
  }

  static isTakeBook(status: BorrowStatus) {
    if (status === BorrowStatus.REQUESTED || status === BorrowStatus.BORROWED) {
      return true;
    }
    return false;
  }

  static isFirstStatus(status: BorrowStatus) {
    return status === BorrowStatus.REQUESTED || status === BorrowStatus.FOLLOWED;
  }

  static getLabel(status: BorrowStatus) {
    switch (status) {
      case BorrowStatus.FOLLOWED:
        return "label-info";
      case BorrowStatus.REQUESTED:
        return "label-warning";
      case BorrowStatus.BORROWED:
        return "label-success";
      case BorrowStatus.RETURNED:
        return "label-primary";
      default:
        return "label-default";
    }
  }

  static isOverdue(createdAt: Date) {
    return moment.duration(moment().diff(moment(createdAt))).asDays() >= this.OVERDUE_DURATION;
  }

  static async deleteNotTakenCards(): Promise<void> {
    await BorrowCard.createQueryBuilder()
      .update(BorrowCard)
      .set({ status: BorrowStatus.CANCELED })
      .where("status = :status", { status: BorrowStatus.REQUESTED })
      .andWhere("scheduled_at < :date", { date: new Date() })
      .execute();
  }

  static async sendDueNotifications(): Promise<void> {
    let dueCardList = await BorrowCard.createQueryBuilder("card")
      .where("status = :status", { status: BorrowStatus.BORROWED })
      .andWhere("borrowed_at < :date", {
        date: moment().subtract(this.OVERDUE_DURATION, "days").toDate(),
      })
      .leftJoinAndSelect("card.book", "book")
      .leftJoinAndSelect("card.user", "user")
      .getMany();
    await UserNotification.save(
      dueCardList.map(function (card) {
        let noti = new UserNotification();
        noti.book = card.book;
        noti.content = `Bạn đã quá hạn trả sách <strong>${card.book.title}</strong>`;
        noti.type = NotiType.DUE;
        noti.user = card.user;
        return noti;
      }),
    );
  }

  getOverdueDate(): moment.Moment {
    return moment(this.borrowedAt).add(BorrowCard.OVERDUE_DURATION, "d");
  }

  changeBookCount(oldStatus: BorrowStatus | null = BorrowStatus.CANCELED) {
    if (!oldStatus) {
      oldStatus = BorrowStatus.CANCELED;
    }
    if (BorrowCard.isTakeBook(oldStatus) && !BorrowCard.isTakeBook(this.status)) {
      this.book.currentBookCount += 1;
    } else if (!BorrowCard.isTakeBook(oldStatus) && BorrowCard.isTakeBook(this.status)) {
      this.book.currentBookCount -= 1;
      this.borrowedAt = new Date();
    }
    if (this.book.currentBookCount < 0) {
      throw new Error("Số sách còn lại không đủ");
    }
  }
}
