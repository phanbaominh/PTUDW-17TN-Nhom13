import express from "express";
import { Book } from "../entities/Book";
import { Comment } from "../entities/Comment";
import nunjucks from "nunjucks";

var router = express.Router();

router.get("/books/:id", async function (req, res, next) {
  try {
    const book = await Book.findOneWithRelations(Number(req.params.id));
    const comments = await book.toplevelComments();
    await Promise.allSettled(comments.map(comment => comment.setRepliesCount()));
    console.log('comments:', JSON.stringify(comments, null, 2));
    const relatedBooks: Book[] = await Book.getRelatedBooks(book);
    res.render("book", {
      title: "Homepage",
      book,
      relatedBooks,
      comments,
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
