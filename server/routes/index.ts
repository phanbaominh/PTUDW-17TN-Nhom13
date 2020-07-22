import express from "express";
import { Book } from "../entities/Book";
import { Category } from "../entities/Category";
import EntityHelpers from "../entities/helpers";
var router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const books: Book[] = await Book.getMany(10);
    const categories: Category[] = await EntityHelpers.getAll(Category);
    res.render("index", {
      title: "Homepage",
      books,
      categories,
    });
  } catch (err){
    next(err);
  }
  
});

export default router;
