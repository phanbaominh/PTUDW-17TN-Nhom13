import { Router } from "express";
let router = Router();

router.get("/", function (req, res, next) {
  res.render("settings", {
    title: "Settings"
  });
});

export default router;
