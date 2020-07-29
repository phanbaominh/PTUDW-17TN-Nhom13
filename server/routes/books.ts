import express from "express";
import { Book } from "../entities/Book";
import { getRedirectOption } from "./helpers";

var router = express.Router();

router.get("/books/:id", async function (req, res, next) {
  try {
    const book = await Book.findOneWithRelations(Number(req.params.id));
    const options = getRedirectOption(req);
    const comments = await book.toplevelComments();
    await Promise.allSettled(comments.map(comment => comment.setRepliesCount()));
    const relatedBooks: Book[] = await Book.getRelatedBooks(book);
    res.render("book", {
      title: `${book.title}`,
      book,
      relatedBooks,
      comments,
      ...options,
    });
  } catch (err){
    res.status(404).render("index", {
      title: "Homepage",
      flash: {
        type: "error",
        content: err
      }
    });
  }
});

export default router;
