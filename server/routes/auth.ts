import express from "express";
var router = express.Router();

router.get("/login", function (req, res, next) {
  res.render("login", {
    title: "Login"
  });
});

router.get("/forgot-password", function (req, res, next) {
  res.render("forgot-password", {
    title: "Forgot password"
  });
});

export default router;
