import express from "express";
import { Book } from "../entities/Book";
import { Category } from "../entities/Category";
import EntityHelpers from "../entities/helpers";

let router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const books: Book[] = await Book.getMany(10);
    const categories: Category[] = await EntityHelpers.getAll(Category);
    res.render("index", {
      title: "Homepage",
      books,
      categories
    });
  } catch (err) {
    next(err);
  }
});

router.get("/guide", function (req, res) {
  res.render("guide.html", {
    title: "Hướng dẫn sử dụng"
  });
});

export default router;
