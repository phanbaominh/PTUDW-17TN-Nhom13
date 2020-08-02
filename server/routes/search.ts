import { Router } from "express";
import renderTemplate from "../utils/renderTemplate";
let router = Router();

router.get("/", function (req, res, next) {
  let q = req.query.q;
  renderTemplate(req, res, "search", {
    title: "Search",
    query: q
  });
});

export default router;
