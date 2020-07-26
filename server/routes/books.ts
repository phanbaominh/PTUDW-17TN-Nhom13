import express from "express";
import { DUMMY_COMMENTS } from "../models/Comment";
import { Book } from "../entities/Book";

var router = express.Router();

router.get("/books/:id", async function (req, res, next) {
  try {
    const book = await Book.findOneWithRelations(Number(req.params.id));
    const relatedBooks: Book[] = await Book.getRelatedBooks(book);
    res.render("book", {
      title: "Homepage",
      book,
      comments: DUMMY_COMMENTS,
      relatedBooks,
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
