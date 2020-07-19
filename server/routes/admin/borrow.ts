import { Router } from "express";

let router = Router();

router.get("/", function (_, res) {
  res.render("admin-borrow.html");
});

export default router;
