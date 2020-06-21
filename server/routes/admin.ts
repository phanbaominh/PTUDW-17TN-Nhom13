import { Router } from "express";
import path from "path";
let router = Router();

router.get("/", function (_, res) {
  res.redirect("/admin/login");
});

router.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "..", "public", "admin-login.html"));
});

router.post("/login", function (req, res) {
  res.redirect("/admin/borrow");
});

router.get("/borrow", function (_, res) {
  res.sendFile(path.join(__dirname, "..", "..", "public", "view-borrow.html"));
});

router.get("/return", function (_, res) {
  res.sendFile(path.join(__dirname, "..", "..", "public", "view-return.html"));
});

router.get("/book", function (_, res) {
  res.sendFile(path.join(__dirname, "..", "..", "public", "view-book.html"));
});

router.get("/book/new", function (_, res) {
  res.sendFile(path.join(__dirname, "..", "..", "public", "book-new.html"));
});

router.get("/book/update", function (_, res) {
  res.sendFile(path.join(__dirname, "..", "..", "public", "book-update.html"));
});

router.get("/reader", function (_, res) {
  res.sendFile(path.join(__dirname, "..", "..", "public", "import-reader.html"));
});

export default router;
