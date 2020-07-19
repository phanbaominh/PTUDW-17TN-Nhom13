import { Router } from "express";

let router = Router();

router.get("/", function (_, res) {
  res.render("admin-return.html");
});

export default router;
