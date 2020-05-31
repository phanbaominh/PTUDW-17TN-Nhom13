import express, { Request } from "express";
import { requireAuth } from "../middlewares/auth";
import { DUMMY_USER } from "../models/User";
var router = express.Router();

router.get("/login", function (req, res, next) {
  if (res.locals.user) {
    res.redirect("/");
    return;
  }
  res.render("login", {
    title: "Login",
    user: res.locals.user
  });
});

/**
 * This route is just a placeholder for the actual login route (which will be implemented later)
 * The only account allowed to login is (1712092, 123)
 */
router.post("/login", function (req: Request, res, next) {
  let { username, password }: { username: string; password: string } = req.body;
  if (username !== "1712092" || password !== "123") {
    res.status(401).redirect("/login");
    return;
  }
  res.cookie("authToken", JSON.stringify(DUMMY_USER));
  res.redirect("/");
});

router.get("/logout", function (req, res, next) {
  res.clearCookie("authToken");
  res.redirect("/");
});

router.get("/profile", requireAuth, function (req, res, next) {
  res.send("Hello there");
});

router.get("/forgot-password", function (req, res, next) {
  res.render("forgot-password", {
    title: "Forgot password",
    user: res.locals.user
  });
});

export default router;
