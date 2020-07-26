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
import dotenv from "dotenv";

import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import catalogueRouter from "./routes/catalogue";
import booksRouter from "./routes/books";
import newsRouter from "./routes/news";
import settingsRouter from "./routes/settings";
import searchRouter from "./routes/search";
import adminRouter from "./routes/admin";

import { parseAuth } from "./middlewares/auth";
import db from "./db";
import { Connection } from "typeorm";
import { initPassport } from "./init_auth";
import { testDB } from "./test_db";

var app = express();
dotenv.config({
  path: path.join(__dirname, "..", ".env")
});

var env = nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app
});

app.set("engine", env);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(methodOverride('_method'));
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
  var connection: Connection = null;
  try {
    connection = await db.initialise();
  } catch (e) {
    console.log(e);
    return;
  }

  // await testDB();
  initPassport();

  app.use(passport.initialize());
  app.use(passport.session());
  app.use("*", parseAuth);

  app.use("/", indexRouter);
  app.use("/", authRouter);
  app.use("/", catalogueRouter);
  app.use("/", booksRouter);
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
    res.render("error");
  });

  var port = process.env.PORT || 3000;
  var server = app.listen(port, function () {
    console.log("Server running port " + port);
  });

  const terminator = createHttpTerminator({server});
  function shutdown() {
    terminator.terminate();
    connection.close();
  }

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
})();
