import express, { Request } from "express";
import { requireAuth } from "../middlewares/auth";
import passport from "passport";
import { User } from "../entities/User";
import { Book } from "../entities/Book";
import renderTemplate from "../utils/renderTemplate";
import { BorrowCard, BorrowStatus } from "../entities/BorrowCard";
import { redirectWithOption, getRedirectOption } from "./helpers";
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
  res.redirect("/");
});

router.get("/profile", requireAuth, async function (req, res, next) {
  try {
    const currentUser = (req.user as User);
    const options = getRedirectOption(req);
    const borrowCards = await currentUser.getBorrowCards();
    const bAndRBooks: Book[] = [] ;
    const returnedBooks: Book[] = [];
    const followedBooks: Book[] = [];
    const mapReturned = new Map<number, boolean>();
    borrowCards.forEach(card => {
      card.book.currentCard = card;
      if (BorrowCard.isTakeBook(card.status)) {
        bAndRBooks.push(card.book);
      } else if (card.status === BorrowStatus.RETURNED){
        if (!mapReturned.has(card.book.id)){
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
  } catch (err){
    redirectWithOption(req, res, "/", {
      flash: {
        type: "error",
        content: err.message,
      },
    });
  }
  
});

router.get("/forgot-password", function (req, res, next) {
  renderTemplate(req, res, "forgot-password", {
    title: "Forgot password"
  });
});

export default router;
