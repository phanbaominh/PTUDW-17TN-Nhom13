import { Router } from "express";
let router = Router();

router.get("/", function (req, res, next) {
  let q = req.query.q;
  res.render("search", {
    title: "Search",
    user: res.locals.user,
    query: q
  });
});

export default router;
