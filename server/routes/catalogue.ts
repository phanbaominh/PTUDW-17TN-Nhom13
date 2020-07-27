import express from "express";
import { Category } from "../entities/Category";

var router = express.Router();

router.get("/catalogue", async function (req, res, next) {
  try {
    const categories: Category[] = await Category.getAllWithBooks();
    res.render("catalogue", {
      title: "Catalogue",
      categories,
    });
  } catch(err){
    next(err);
  }
});

export default router;
