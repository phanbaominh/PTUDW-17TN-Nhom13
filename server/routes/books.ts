import express from "express";
import { Book } from "../entities/Book";
import { getRedirectOption } from "./helpers";
import renderTemplate from "../utils/renderTemplate";
import { User } from "../entities/User";
import UserNotification from "../entities/UserNotification";

let router = express.Router();

router.get("/books/:id", async function (req, res, next) {
  // Mark notification as read
  if (typeof req.query.nid === "string") {
    let notificationId = parseInt(req.query.nid);
    if (!isNaN(notificationId)) {
      UserNotification.update(
        {
          id: notificationId,
        },
        {
          read: true,
        },
      );
    }
  }

  try {
    const book = await Book.findOneWithRelations(Number(req.params.id));
    const options = getRedirectOption(req);
    const comments = await book.toplevelComments();
    await Promise.allSettled(comments.map((comment) => comment.setRepliesCount()));
    const relatedBooks: Book[] = await Book.getRelatedBooks(book);
    if (req.user) {
      options["status"] = await (req.user as User).getBookStatus(book.id);
    }
    renderTemplate(req, res, "book", {
      title: `${book.title}`,
      book,
      relatedBooks,
      comments,
      ...options,
    });
  } catch (err) {
    renderTemplate(
      req,
      res,
      "index",
      {
        title: "Homepage",
        flash: {
          type: "error",
          content: err,
        },
      },
      404,
    );
  }
});

export default router;
