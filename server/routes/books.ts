import express from "express";
import { findBookById } from "../models/Book";

var router = express.Router();

router.get("/books/:slug", function (req, res, next) {
  console.log(res.locals.user);
  res.render("book", {
    title: "Homepage",
    user: res.locals.user,
    book: findBookById(Number(req.params.slug)),
  });
});

export default router;