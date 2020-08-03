import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import nunjucks from "nunjucks";
import session from "express-session";
import methodOverride from "method-override";
import passport from "passport";
import { createHttpTerminator } from "http-terminator";
import { Connection } from "typeorm";

import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import catalogueRouter from "./routes/catalogue";
import booksRouter from "./routes/books";
import newsRouter from "./routes/news";
import settingsRouter from "./routes/settings";
import searchRouter from "./routes/search";
import adminRouter from "./routes/admin";
import commentsRouter from "./routes/comments";
import borrowsRouter from "./routes/borrows";

import "./configs";
import db from "./configs/database";
import { initPassport } from "./configs/passport";
import { parseAuth } from "./middlewares/auth";
import setupBorrowFilter from "./configs/borrowFilter";
import { BorrowCard } from "./entities/BorrowCard";


let app = express();

let env = nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app
});

setupBorrowFilter(env);

app.set("engine", env);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

(async function () {
  let connection: Connection = null;
  try {
    connection = await db.initialise();
  } catch (e) {
    console.log(e);
    return;
  }
  await BorrowCard.deleteNotTakenCards();
  // await testDB();
  initPassport();

  app.use(passport.initialize());
  app.use(passport.session());
  app.use("*", parseAuth);

  app.use("/", indexRouter);
  app.use("/", authRouter);
  app.use("/", catalogueRouter);
  app.use("/", booksRouter);
  app.use("/books", commentsRouter);
  app.use("/books", borrowsRouter);
  app.use("/news", newsRouter);
  app.use("/settings", settingsRouter);
  app.use("/search", searchRouter);
  app.use("/admin", adminRouter);
  
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    // renderTemplate(req, res, "error");
  });

  let port = process.env.PORT || 3000;
  let server = app.listen(port, function () {
    console.log("Server running port " + port);
  });

  const terminator = createHttpTerminator({ server });
  function shutdown() {
    terminator.terminate();
    connection.close();
  }

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
})();
