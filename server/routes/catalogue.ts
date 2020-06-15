import express from "express";
import { DUMMY_BOOKS } from "../models/Book";
import { DUMMY_CATEGORIES } from "../models/Category";

var router = express.Router();

router.get("/catalogue", function (req, res, next) {
  res.render("catalogue", {
    title: "Catalogue",
    books: DUMMY_BOOKS,
    categories: DUMMY_CATEGORIES,
  });
});

export default router;