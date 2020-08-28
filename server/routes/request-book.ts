import { Router } from "express";
import renderTemplate from "../utils/renderTemplate";
import { requireAuth } from "../middlewares/auth";
import { User } from "../entities/User";
import BookRequest from "../entities/BookRequest";

type BookRequestBody = {
  bookTitle: string;
  bookAuthor: string;
  noteRequest: string;
};

let router = Router();

router.get("/", requireAuth, function (req, res) {
  let currentUser = res.locals.user as User;
  if (!currentUser.isTeacher) {
    res.redirect("/");
    return;
  }
  renderTemplate(req, res, "request-book.html", {
    title: "Yêu cầu thêm sách",
  });
});

router.post("/", requireAuth, async function (req, res) {
  let currentUser = res.locals.user as User;
  if (!currentUser.isTeacher) {
    res.redirect("/");
    return;
  }

  let { bookTitle, bookAuthor, noteRequest }: BookRequestBody = req.body;

  try {
    if (
      typeof bookTitle !== "string" ||
      typeof bookAuthor !== "string" ||
      typeof noteRequest !== "string"
    ) {
      throw new Error("Don't do that");
    }

    let request = new BookRequest();
    request.bookTitle = bookTitle;
    request.bookAuthor = bookAuthor;
    request.noteRequest = noteRequest;
    request.user = currentUser;
    await request.save();

    renderTemplate(req, res, "request-book.html", {
      flash: {
        type: "success",
        content: "Yêu cầu đã được nhận",
      },
    });
  } catch (err) {
    renderTemplate(req, res, "request-book.html", {
      flash: {
        type: "error",
        content: err.message,
      },
    });
  }
});

export default router;
