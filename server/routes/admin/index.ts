import { Router } from "express";
import { Environment } from "nunjucks";

import authRouter from "./auth";
import bookRouter from "./book";
import borrowRouter from "./borrow";
import readerRouter from "./reader";
import returnRouter from "./return";
import updatePasswordRouter from "./update-password";
import createLibrarianRouter from "./create-librarian";

import { requireAdmin } from "../../middlewares/auth";

let router = Router();

router.use(function (req, res, next) {
  let url = req.url;
  let engine: Environment = res.app.get("engine");
  if (engine) {
    engine.addFilter("activeRoute", function (routes) {
      for (let route of routes) {
        if (url === route) {
          return "active";
        }
      }
      return "";
    });
  }
  next();
});

router.get("/", function (_, res) {
  res.redirect("/admin/login");
});

router.use("/", authRouter);

router.use(requireAdmin);
router.use("/book", bookRouter);
router.use("/borrow", borrowRouter);
router.use("/reader", readerRouter);
router.use("/return", returnRouter);
router.use("/", updatePasswordRouter);
router.use("/", createLibrarianRouter);

export default router;
