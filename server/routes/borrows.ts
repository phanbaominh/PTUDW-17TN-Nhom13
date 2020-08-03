import express, { Request } from "express";
import nunjucks from "nunjucks";
import { requireAuth } from "../middlewares/auth";
import { Book } from "../entities/Book";
import { User } from "../entities/User";
import { BorrowCard, BorrowStatus } from "../entities/BorrowCard";
import { redirectWithOption } from "./helpers";
var router = express.Router();

function checkFromProfile(req: Request): boolean {
  let isFromProfile = false;
  if (req.headers.referer) {
    const tmp = req.headers.referer.split("/");
    isFromProfile = /profile/.test(tmp[tmp.length - 1]);
  }
  return isFromProfile;
}

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
    if ((await currentUser.getRAndBCount()) >= BorrowCard.MAX_BORROWED) {
      throw new Error("Bạn đã đạt tối đa (2) số sách mượn cùng 1 lúc");
    }
    const book = await Book.findOneOrFail(Number(req.params.bookId), { relations: ["borrowCards"] });
    let card = await currentUser.getBorrowCardForBook(book.id);
    if (!card) {
      card = new BorrowCard();
      card.user = currentUser;
      card.book = book;
      let flashMsg;
      if (book.currentBookCount > 0) {
        card.status = BorrowStatus.REQUESTED;
        flashMsg = "Bạn đã mượn sách thành công"
        book.currentBookCount -= 1;
        card.borrowedAt = new Date();
      } else {
        card.status = BorrowStatus.FOLLOWED;
        flashMsg = "Bạn đã theo dõi sách thành công"
      }
      card.createdAt = new Date();
      await card.save();
      // await Book.save(book);
      const template = renderSuccessResponse(book, card.status, flashMsg, currentUser);
      res.json({ template, bookCount: book.currentBookCount });
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
  const isFromProfile = checkFromProfile(req);
  function redirectProfile(options){
    redirectWithOption(req, res, "/profile", {
      ...options,
    });
  };

  try {
    const currentUser = (req.user as User);
    const book = await Book.findOneOrFail(Number(req.params.bookId), { relations: ["borrowCards"] });
    let card = await currentUser.getBorrowCardForBook(book.id);
    if (!card) {
      res.status(400).json({ template: "" });
    } else {
      if (BorrowCard.isFirstStatus(card.status)){
        let flashMsg = "";
        if (card.status === BorrowStatus.REQUESTED) {
          book.currentBookCount += 1;
          flashMsg = "Bạn đã hủy mượn thành công"
        } else {
          flashMsg = "Bạn đã hủy theo dõi thành công"
        }
        
        card.status = BorrowStatus.CANCELED;
        await BorrowCard.save(card);
        // await Book.save(book);
        const template = renderSuccessResponse(book, card.status, flashMsg, currentUser);
        
        if (!isFromProfile) {
          res.json({ template, bookCount: book.currentBookCount });
        } else {
          redirectProfile({
            flash: {
              type: "success",
              content: flashMsg,
            }
          })
        }
      } else {
        if (!isFromProfile) {
          res.status(400).json({ template: "" })
        } else {
          redirectProfile({});
        }
      }
    }
  } catch (err) {
    const flash = {
      type: "error",
      content: err.message,
    };
    const template = nunjucks.render("flash.html", {
      flash
    })
    if (!isFromProfile){
      res.status(404).json({ template });
    } else {
      redirectProfile({ flash });
    }
    
  }
})
export default router;