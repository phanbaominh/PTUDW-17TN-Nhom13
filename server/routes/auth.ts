import express, { Request } from "express";
import { requireAuth } from "../middlewares/auth";
import passport from "passport";
import { User } from "../entities/User";
import { Book } from "../entities/Book";
import renderTemplate from "../utils/renderTemplate";
var router = express.Router();

router.get("/login", function (req, res) {
  if (res.locals.user) {
    res.redirect("/");
    return;
  }
  renderTemplate(req, res, "login", {
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
    renderTemplate(
      req,
      res,
      "login",
      {
        title: "Login",
        flash: {
          type: "error",
          content: err
        }
      },
      400
    );
  }
});

router.get("/logout", function (req, res, next) {
  req.logout();
  console.log({ user: req.user });
  res.redirect("/");
});

router.get("/profile", requireAuth, async function (req, res, next) {
  const bookList = await Book.getMany(10);
  renderTemplate(req, res, "profile", {
    title: "Profile",
    bookList: bookList
  });
});

router.get("/forgot-password", function (req, res, next) {
  renderTemplate(req, res, "forgot-password", {
    title: "Forgot password"
  });
});

export default router;
