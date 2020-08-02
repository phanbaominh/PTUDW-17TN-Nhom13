import { Router } from "express";
import renderTemplate from "../utils/renderTemplate";
let router = Router();

router.get("/", function (req, res, next) {
  renderTemplate(req, res, "settings", {
    title: "Settings"
  });
});

export default router;
