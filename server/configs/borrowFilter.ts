import { BorrowStatus, BorrowCard, TrangThai } from "../entities/BorrowCard";
import moment from "moment";
import { Book } from "../entities/Book";
import getVNTime from "../utils/getVNTime";
import nunjucks from "nunjucks";

export default function setupBorrowFilter(env: nunjucks.Environment) {
  env.addFilter("getBorrowForm", (status: BorrowStatus, bookId: number, bookCount: number) => {
    return BorrowCard.getBorrowForm(status, bookId, bookCount);
  });

  env.addFilter("isBorrowConfirmable", (status: BorrowStatus) => {
    return BorrowCard.isTakeBook(status);
  });

  env.addFilter("getBorrowConfirmText", (status: BorrowStatus) => {
    if (status === BorrowStatus.REQUESTED) {
      return "lấy sách";
    } else if (status === BorrowStatus.BORROWED) {
      return "trả sách";
    }
    return "";
  });

  env.addFilter("isCanceled", (status: BorrowStatus) => {
    return status === BorrowStatus.CANCELED;
  });

  env.addFilter("getStatusLabel", (card: BorrowCard) => {
    const status = card.status;
    let text = TrangThai[status];
    let style = BorrowCard.getLabel(status);
    let title = `Tạo lúc ${getVNTime(card.createdAt)}`;

    if (status === BorrowStatus.BORROWED || status === BorrowStatus.RETURNED) {
      title = `Mượn lúc ${getVNTime(card.borrowedAt)}`;
    }

    if (status === BorrowStatus.BORROWED && BorrowCard.isOverdue(card.borrowedAt)) {
      text = TrangThai.overdue;
      style = "badge-danger";
      title = `Hết hạn lúc ${getVNTime(moment(card.borrowedAt).add(BorrowCard.MAX_BORROWED, "d"))}`;
    }

    return `<span class="label ${style}" title="${title}">${text}</span>`;
  });

  env.addFilter("getRelativeTime", (date: Date) => {
    return moment(date).locale("vi").fromNow();
  });

  env.addFilter("getProfileBookSlot", (book: Book) => {
    const card = book.currentCard;
    if (BorrowCard.isFirstStatus(card.status)) {
      const outerStyle = "mt-4 sm:mt-0 bottom-0 insert-x-auto inline-block w-full";
      return BorrowCard.getBorrowForm(card.status, book.id, book.currentBookCount, outerStyle);

      // return `<button type="button"
      //   class="mt-4 sm:mt-0 sm:absolute bottom-0 insert-x-auto w-full text-white
      //          bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
      //   Hủy Mượn
      // </button>`;
    } else if (card.status === BorrowStatus.BORROWED) {
      const textColor = BorrowCard.isOverdue(card.borrowedAt) ? "text-red-500" : "text-indigo-500";
      return `
      <p
        class="mt-4 sm:mt-0 bottom-0 w-full ${textColor} border-t-2 border-indigo-500 py-2 text-center">
        Ngày hết hạn: ${getVNTime(card.borrowedAt, "L")}
      </p>`;
    }
    return "";
  });
}
