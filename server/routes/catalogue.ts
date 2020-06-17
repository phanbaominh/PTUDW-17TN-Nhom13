import express from "express";
import { DUMMY_BOOK_LIST } from "../models/Book";
import { DUMMY_CATEGORY_LIST } from "../models/Category";

var router = express.Router();

router.get("/catalogue", function (req, res, next) {
  res.render("catalogue", {
    title: "Catalogue",
    books: DUMMY_BOOK_LIST,
    categories: DUMMY_CATEGORY_LIST
  });
});

export default router;
