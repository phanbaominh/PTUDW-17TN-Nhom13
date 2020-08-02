import { NextFunction, Response, Request } from "express";
import { User } from "../entities/User";

function parseAuth(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    let user = req.user as User;
    if (!user.isAdmin) {
      res.locals.user = user;
    } else {
      res.locals.admin = user;
    }
  }
  next();
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    res.status(401).redirect("/login");
    return;
  }
  next();
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!res.locals.admin) {
    res.status(401).redirect("/admin/login");
    return;
  }
  next();
}

export { parseAuth, requireAuth, requireAdmin };
