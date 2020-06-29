import express, { Request } from "express";
import { requireAuth } from "../middlewares/auth";
import { DUMMY_BOOK_LIST } from "../models/Book";
import { User } from "../entities/User";
var router = express.Router();

router.get("/login", function (req, res, next) {
  if (res.locals.user) {
    res.redirect("/");
    return;
  }
  res.render("login", {
    title: "Login"
  });
});

/**
 * This route is just a placeholder for the actual login route (which will be implemented later)
 * The only account allowed to login is (1712092, 123)
 */
router.post("/login", async function (req: Request, res, next) {
  let { username, password }: { username: string; password: string } = req.body;

  try {
    if (typeof username !== "string" || typeof password !== "string") {
      throw "Don't do that";
    }

    let user = await User.findOneOrFail({ username }).catch(function () {
      throw "Tài khoản không tồn tại. Bạn hãy liên hệ với thư viện để học lớp hướng dẫn sử dụng thư viện, sau đó sẽ được tạo tài khoản.";
    });
    user.strip();
    if (!user.checkPassword(password)) {
      throw "Sai mật khẩu";
    }
    res.cookie(
      "authToken",
      JSON.stringify({
        username: user.username,
        fullname: user.fullname,
        profilePicture: user.profilePicture
      })
    );
    res.redirect("/profile");
  } catch (e) {
    res.status(400).render("login", {
      title: "Login",
      flash: {
        type: "error",
        content: e
      }
    });
    return;
  }
});

router.get("/logout", function (req, res, next) {
  res.clearCookie("authToken");
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
