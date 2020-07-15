import { NextFunction, Response, Request } from "express";
import { Environment } from "nunjucks";

function parseAuth(req: Request, res: Response, next: NextFunction) {
  res.locals.user = req.user;

  let engine: Environment = res.app.get("engine");
  if (engine) {
    engine.addGlobal("request", req);
    engine.addGlobal("user", req.user);
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

export { parseAuth, requireAuth };
