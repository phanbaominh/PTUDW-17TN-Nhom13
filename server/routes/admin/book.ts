import { Router } from "express";

let router = Router();

router.get("/", function (_, res) {
  res.render("admin-book.html");
});

router.get("/new", function (_, res) {
  res.render("admin-book.new.html");
});

router.get("/update", function (_, res) {
  res.render("admin-book.update.html");
});

export default router;
