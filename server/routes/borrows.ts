import express from "express";
import nunjucks from "nunjucks";
import { requireAuth } from "../middlewares/auth";
import { Book } from "../entities/Book";
import { User } from "../entities/User";
import { BorrowCard, BorrowStatus } from "../entities/BorrowCard";
var router = express.Router();

function renderSuccessResponse(book: Book, status: BorrowStatus, flashMsg: string, user: User){
  return nunjucks.render("partials/book.borrow.button.html", {
    book,
    status,
    isResponse: true,
    flash: {
      type: "success",
      content: flashMsg,
    },
    user,
  });
}

router.post("/:bookId/borrows", requireAuth, async function (req, res) {
  try {
    const currentUser = (req.user as User);
    const book = await Book.findOneOrFail(Number(req.params.bookId));
    let card = await currentUser.getBorrowCard(book.id);
    console.log("in!");
    if (!card) {
      card = new BorrowCard();
      card.user = currentUser;
      card.book = book;
      let flashMsg;
      if (book.bookCount > 0) {
        card.status = BorrowStatus.REQUESTED;
        flashMsg = "Bạn đã mượn sách thành công"
        book.bookCount -= 1;
      } else {
        card.status = BorrowStatus.FOLLOWED;
        flashMsg = "Bạn đã theo dõi sách thành công"
      }
      card.createdAt = new Date();
      await card.save();
      await Book.save(book);
      const template = renderSuccessResponse(book, card.status, flashMsg, currentUser);
      res.json({ template, bookCount: book.bookCount });
    } else {
      res.status(400).json({ template: "" });
    }
  } catch(err) {
    const template = nunjucks.render("flash.html", {
      flash: {
        type: "error",
        content: err.message,
      }
    })
    res.status(404).json({ template });
  }
});

router.delete("/:bookId/borrows", requireAuth, async function (req, res) {
  try {
    const currentUser = (req.user as User);
    const book = await Book.findOneOrFail(Number(req.params.bookId));
    let card = await currentUser.getBorrowCard(book.id);
    if (!card) {
      res.status(400).json({ template: "" });
    } else {
      if (card.status === BorrowStatus.FOLLOWED || card.status === BorrowStatus.REQUESTED){
        let flashMsg = "";
        if (card.status === BorrowStatus.REQUESTED) {
          book.bookCount += 1;
          flashMsg = "Bạn đã hủy mượn thành công"
        } else {
          flashMsg = "Bạn đã hủy theo dõi thành công"
        }
        
        card.status = BorrowStatus.CANCELED;
        await BorrowCard.save(card);
        await Book.save(book);
        const template = renderSuccessResponse(book, card.status, flashMsg, currentUser);
        res.json({ template, bookCount: book.bookCount });
      } else {
        res.status(400).json({ template: "" });
      }
    }
  } catch (err) {
    const template = nunjucks.render("flash.html", {
      flash: {
        type: "error",
        content: err.message,
      }
    })
    res.status(404).json({ template });
  }
})
export default router;