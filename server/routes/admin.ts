import { Router } from "express";
import { Environment } from "nunjucks";
let router = Router();

router.use(function (req, res, next) {
  let engine: Environment = res.app.get("engine");
  if (engine) {
    engine.addFilter("activeRoute", function (routes) {
      for (let route of routes) {
        if (req.url === route) {
          return "active";
        }
      }
      return "";
    });
  }
  next();
});

router.get("/", function (_, res) {
  res.redirect("/admin/login");
});

router.get("/login", function (_, res) {
  res.render("admin-login");
});

router.post("/login", function (_, res) {
  res.redirect("/admin/borrow");
});

router.get("/borrow", function (_, res) {
  res.render("admin-borrow.html");
});

router.get("/return", function (_, res) {
  res.render("admin-return.html");
});

router.get("/book", function (_, res) {
  res.render("admin-book.html");
});

router.get("/book/new", function (_, res) {
  res.render("admin-book.new.html");
});

router.get("/book/update", function (_, res) {
  res.render("admin-book.update.html");
});

router.get("/reader", function (_, res) {
  res.render("admin-reader.html");
});

export default router;
