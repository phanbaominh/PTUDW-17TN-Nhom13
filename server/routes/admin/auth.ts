import { Router } from "express";

let router = Router();

router.get("/login", function (_, res) {
  res.render("admin-login");
});

router.post("/login", function (_, res) {
  res.redirect("/admin/borrow");
});

export default router;
