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

export default router;