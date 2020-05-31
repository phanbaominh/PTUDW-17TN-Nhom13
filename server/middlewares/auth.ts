import { NextFunction, Response, Request } from "express";
import User from "../models/User";
import morgan from "morgan";

function parseUserFromCookie(cookie: string): User | null {
  try {
    let user = JSON.parse(cookie);
    return user;
  } catch (e) {
    return null;
  }
}

function parseAuth(req: Request, res: Response, next: NextFunction) {
  var user = parseUserFromCookie(req.cookies.authToken);
  res.locals.user = user;
  next();
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!res.locals.user) {
    res.status(401).redirect("/login");
    return;
  }
  next();
}

export { parseAuth, requireAuth };
