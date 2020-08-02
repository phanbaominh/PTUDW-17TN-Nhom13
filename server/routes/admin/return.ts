import { Router } from "express";
import renderTemplate from "../../utils/renderTemplate";

let router = Router();

router.get("/", function (req, res) {
  renderTemplate(req, res, "admin-return.html");
});

export default router;
