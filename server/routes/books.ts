import express from "express";
import { findBookById } from "../models/Book";
import { DUMMY_COMMENTS } from "../models/Comment";

var router = express.Router();

router.get("/books/:slug", function (req, res, next) {
  console.log(res.locals.user);
  res.render("book", {
    title: "Homepage",
    user: res.locals.user,
    book: findBookById(Number(req.params.slug)),
    comments: DUMMY_COMMENTS,
  });
});

router.post("/books/:id/comments", function (req, res, next){
  res.render("book-comment-form", {
    layout: false,
    bookId: req.params.id,
    user: res.locals.user,
  });
});

export default router;