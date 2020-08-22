import { Router } from "express";
import renderTemplate from "../utils/renderTemplate";
import { requireAuth } from "../middlewares/auth";
let router = Router();

router.get("/", requireAuth, function (req, res, next) {
  renderTemplate(req, res, "settings", {
    title: "Settings",
  });
});

export default router;
