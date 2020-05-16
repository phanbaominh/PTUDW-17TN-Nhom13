import express from "express";
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Homepage 123"
  });
});

export default router;
