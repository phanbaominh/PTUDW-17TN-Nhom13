import { Router } from "express";
let router = Router();

router.get("/", function (req, res, next) {
  res.render("settings", {
    title: "Settings",
    user: res.locals.user
  });
});

export default router;
