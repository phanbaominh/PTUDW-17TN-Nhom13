import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import hbs from "hbs";

import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import catalogueRouter from "./routes/catalogue";

import { parseAuth } from "./middlewares/auth";

var app = express();

// view engine setup
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("*", parseAuth);

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", catalogueRouter);

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
app.listen(port, function () {
  console.log("Server running port " + port);
});
