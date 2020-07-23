import express, { Request } from "express";
import { requireAuth } from "../middlewares/auth";
import { DUMMY_BOOK_LIST } from "../models/Book";
import passport from "passport";
import { User } from "../entities/User";
var router = express.Router();

router.get("/login", function (_, res) {
  if (res.locals.user) {
    res.redirect("/");
    return;
  }
  res.render("login", {
    title: "Login"
  });
});

router.post("/login", async function (req: Request, res, next) {
  let { username, password }: { username: string; password: string } = req.body;
  try {
    if (typeof username !== "string" || typeof password !== "string") {
      throw "Don't do that";
    }

    await new Promise(function (resolve, reject) {
      passport.authenticate("local", function (err, user: User | null) {
        if (err || (user && user.isAdmin)) {
          reject(
            "Tài khoản không tồn tại. Bạn hãy liên hệ với thư viện để học lớp hướng dẫn sử dụng thư viện, sau đó sẽ được tạo tài khoản."
          );
          return;
        }
        if (!user) {
          reject("Sai mật khẩu");
        }

        req.logIn(user, function (err) {
          if (err) {
            reject("Some kind of error happened when logging in");
            return;
          }
          resolve();
        });
      })(req, res, next);
    });

    return res.redirect("/profile");
  } catch (err) {
    res.status(400).render("login", {
      title: "Login",
      flash: {
        type: "error",
        content: err
      }
    });
  }
});

router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

router.get("/profile", requireAuth, function (req, res, next) {
  res.render("profile", {
    title: "Profile",
    bookList: DUMMY_BOOK_LIST
  });
});

router.get("/forgot-password", function (req, res, next) {
  res.render("forgot-password", {
    title: "Forgot password"
  });
});

export default router;
