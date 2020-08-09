import { EntitySubscriberInterface, UpdateEvent, EventSubscriber } from "typeorm";
import { BorrowCard, BorrowStatus } from "../entities/BorrowCard";
import UserNotification, { NotiType } from "../entities/UserNotification";
import { Book } from "../entities/Book";

/**
 * Return "weight" of a card (-1 if the user is keeping a book, 0 otherwise)
 * i.o.w, depicting how much the book count changes due to this card
 */
function weight(status: BorrowStatus | undefined) {
  switch (status) {
    case BorrowStatus.BORROWED:
    case BorrowStatus.REQUESTED:
      return -1;
    default:
      return 0;
  }
}

@EventSubscriber()
export class BorrowCardSubscriber implements EntitySubscriberInterface<BorrowCard> {
  listenTo() {
    return BorrowCard;
  }

  private async sendNotificationsToFollower(book: Book) {
    let followerList = (
      await BorrowCard.createQueryBuilder("card")
        .leftJoinAndSelect("card.user", "user")
        .where("card.status = :status", { status: BorrowStatus.FOLLOWED })
        .andWhere("card.book_id = :bookId", { bookId: book.id })
        .getMany()
    ).map((card) => card.user);

    await UserNotification.save(
      followerList.map((follower) => {
        let noti = new UserNotification();
        noti.book = book;
        noti.content = `Bạn có thể mượn <strong>${book.title}</strong> ngay bây giờ`;
        noti.type = NotiType.AVAILABLE;
        noti.user = follower;
        return noti;
      }),
    );
  }

  async afterUpdate(event: UpdateEvent<BorrowCard>) {
    let delta = weight(event.entity?.status) - weight(event.databaseEntity?.status);

    // If the card decreases or keeps the book count unchanged, ignore it
    if (delta <= 0) {
      return;
    }

    let card = await BorrowCard.createQueryBuilder("card")
      .where("card.id = :id", { id: event.entity.id })
      .innerJoinAndSelect("card.book", "book")
      .getOne();
    let book = card.book;

    // This is in a transaction, meaning the card's status has not been written to the database.
    let previousCount = await book.getCurrentCount();
    if (previousCount === 0) {
      // If previous count is 0 and it increases (delta > 0), notify followers
      this.sendNotificationsToFollower(book);
    }
  }
}
