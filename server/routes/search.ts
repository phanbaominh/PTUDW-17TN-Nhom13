import { Router } from "express";
let router = Router();

router.get("/", function (req, res, next) {
  let q = req.query.q;
  res.render("search", {
    title: "Search",
    query: q
  });
});

export default router;
