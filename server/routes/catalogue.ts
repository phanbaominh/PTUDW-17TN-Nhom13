import express from "express";
import { Category } from "../entities/Category";
import renderTemplate from "../utils/renderTemplate";

var router = express.Router();

router.get("/catalogue", async function (req, res, next) {
  try {
    const categories: Category[] = await Category.getAllWithBooks();
    renderTemplate(req, res, "catalogue", {
      title: "Catalogue",
      categories,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
