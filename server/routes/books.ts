import express from "express";
import { findBookById, DUMMY_BOOK_LIST } from "../models/Book";
import { DUMMY_COMMENTS } from "../models/Comment";

var router = express.Router();

router.get("/books/:id", function (req, res, next) {
  res.render("book", {
    title: "Homepage",
    book: findBookById(Number(req.params.id)),
    comments: DUMMY_COMMENTS,
    relatedBooks: DUMMY_BOOK_LIST
  });
});

export default router;
