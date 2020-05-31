import express from "express";
import { DUMMY_BOOKS } from "../models/Book";

var router = express.Router();

router.get("/catalogue", function (req, res, next) {
  res.render("catalogue", {
    title: "Catalogue",
    books: DUMMY_BOOKS,
  });
});

export default router;