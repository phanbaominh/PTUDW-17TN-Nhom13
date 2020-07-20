import { Router } from "express";
import passport from "passport";
import { User } from "../../entities/User";

let router = Router();

router.get("/login", function (_, res) {
  if (res.locals.admin) {
    res.redirect("/admin/borrow");
    return;
  }
  res.render("admin-login");
});

router.post("/login", async function (req, res, next) {
  let { username, password }: { username: string; password: string } = req.body;
  try {
    if (typeof username !== "string" || typeof password !== "string") {
      throw "Don't do that";
    }

    await new Promise(function (resolve, reject) {
      passport.authenticate("local", function (err, user: User | null) {
        if (err || (user && !user.isAdmin)) {
          reject("Tài khoản không tồn tại.");
          return;
        }
        if (!user) {
          reject("Sai mật khẩu");
        }

        req.logIn(user, function (err) {
          if (err) {
            reject("Internal Server Error");
            return;
          }
          resolve();
        });
      })(req, res, next);
    });

    return res.redirect("/admin/borrow");
  } catch (err) {
    res.status(400).render("admin-login", {
      errorMessage: err
    });
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/admin");
});

export default router;
