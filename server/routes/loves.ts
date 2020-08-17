import express, { Request } from "express";
import nunjucks from "nunjucks";
import { requireAuth } from "../middlewares/auth";
import { Book } from "../entities/Book";
import { User } from "../entities/User";
import { Love } from "../entities/Love"
import { redirectWithOption } from "./helpers";
import { getNextFreeDate } from "../utils/time";
var router = express.Router();

function renderSuccessResponse(book: Book, isLove: Boolean, flashMsg: string, user: User){
  return nunjucks.render("partials/book.love.button.html", {
    book,
    isLove,
    isResponse: true,
    flash: {
      type: "success",
      content: flashMsg,
    },
    user,
  });
}

router.post("/:bookId/love", requireAuth, async function (req, res) {
  try {
    const currentUser = (req.user as User);
    const book = await Book.findOneOrFail(Number(req.params.bookId), { relations: ["loves"] });
    let love = await currentUser.getLoveForBook(book.id);
    if (!love) {
      love = new Love();
      love.user = currentUser;
      love.book = book;
      let flashMsg = "Bạn đã thích sách này"
      await love.save();
      // await Book.save(book);
      const template = renderSuccessResponse(book, true, flashMsg, currentUser);
      res.json({template});
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

router.delete("/:bookId/love", requireAuth, async function (req, res) {
    try {
        const currentUser = (req.user as User);
        const book = await Book.findOneOrFail(Number(req.params.bookId), { relations: ["loves"] });
        let love = await currentUser.getLoveForBook(book.id);
        if (love) {
            await love.remove()
            let flashMsg = "Bạn đã bỏ thích sách này"
            const template = renderSuccessResponse(book, false, flashMsg, currentUser);
            res.json({template});
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
export default router;