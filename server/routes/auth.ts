import express, { Request } from "express";
import passport from "passport";
import { v4 as uuid } from "uuid";
import { requireAuth } from "../middlewares/auth";
import { User } from "../entities/User";
import { Book } from "../entities/Book";
import renderTemplate from "../utils/renderTemplate";
import { BorrowCard, BorrowStatus } from "../entities/BorrowCard";
import { redirectWithOption, getRedirectOption } from "./helpers";
import { sendEmail } from "../configs/email";

var router = express.Router();

router.get("/login", function (req, res) {
  if (res.locals.user) {
    res.redirect("/");
    return;
  }
  renderTemplate(req, res, "login", {
    title: "Login",
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
            "Tài khoản không tồn tại. Bạn hãy liên hệ với thư viện để học lớp hướng dẫn sử dụng thư viện, sau đó sẽ được tạo tài khoản.",
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
          content: err,
        },
      },
      400,
    );
  }
});

router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

router.get("/profile", requireAuth, async function (req, res, next) {
  try {
    const currentUser = req.user as User;
    const options = getRedirectOption(req);
    const borrowCards = await currentUser.getBorrowCards();
    const bAndRBooks: Book[] = [];
    const returnedBooks: Book[] = [];
    const followedBooks: Book[] = [];
    const mapReturned = new Map<number, boolean>();
    borrowCards.forEach((card) => {
      card.book.currentCard = card;
      if (BorrowCard.isTakeBook(card.status)) {
        bAndRBooks.push(card.book);
      } else if (card.status === BorrowStatus.RETURNED) {
        if (!mapReturned.has(card.book.id)) {
          returnedBooks.push(card.book);
          mapReturned.set(card.book.id, true);
        }
      } else if (card.status === BorrowStatus.FOLLOWED) {
        followedBooks.push(card.book);
      }
    });
    renderTemplate(req, res, "profile", {
      title: "Profile",
      bAndRBooks,
      returnedBooks,
      followedBooks,
      ...options,
    });
  } catch (err) {
    redirectWithOption(req, res, "/", {
      flash: {
        type: "error",
        content: err.message,
      },
    });
  }
});

router.get("/forgot-password", function (req, res) {
  renderTemplate(req, res, "forgot-password", {
    title: "Forgot password",
    ...getRedirectOption(req),
  });
});

router.post("/forgot-password", async function (req, res) {
  try {
    let { email }: { email: string } = req.body;
    if (typeof email !== "string") {
      throw new Error("Don't do that");
    }

    let token = uuid();
    let updateResult = await User.update({ email, isAdmin: false }, { resetToken: token });
    if (updateResult.affected !== 1) {
      throw new Error("Email không tồn tại");
    }

    let url = `${process.env.WEB_URL}/reset-password?token=${token}`;
    sendEmail({
      to: email,
      subject: "Đặt lại mật khẩu cho tài khoản FITLIB",
      html: `<a href="${url}">${url}</a>`,
    });

    redirectWithOption(req, res, "/forgot-password", {
      flash: {
        type: "success",
        content: "Bạn hãy check email để reset mật khẩu",
      },
    });
  } catch (err) {
    redirectWithOption(req, res, "/forgot-password", {
      flash: {
        type: "error",
        content: err.message,
      },
    });
  }
});

router.get("/reset-password", async function (req, res) {
  let token = req.query.token;
  let user = await User.findOne({
    where: {
      resetToken: token,
    },
  });
  if (!user) {
    redirectWithOption(req, res, "/", {
      flash: {
        type: "error",
        content: "Đường link không còn hoạt động",
      },
    });
    return;
  }
  renderTemplate(req, res, "reset-password.html", {
    title: "Đặt lại mật khẩu",
    token,
    ...getRedirectOption(req),
  });
});

router.post("/reset-password", async function (req, res) {
  try {
    let { password, token }: { password: string; token: string } = req.body;
    if (typeof password !== "string" || typeof token !== "string") {
      throw new Error("Don't do that");
    }

    let user = await User.findOne({
      where: {
        resetToken: token,
      },
    });
    if (!user) {
      throw new Error("Đường link không còn hoạt động");
    }

    user.password = password;
    user.resetToken = null;
    await user.save();

    redirectWithOption(req, res, "/", {
      flash: {
        type: "success",
        content: "Bạn đã đặt lại mật khẩu thành công",
      },
    });
  } catch (err) {
    redirectWithOption(req, res, "/", {
      flash: {
        type: "error",
        content: err.message,
      },
    });
  }
});

export default router;
