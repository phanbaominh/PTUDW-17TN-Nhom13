import { Request, Response } from "express";
import { User } from "../entities/User";

function renderTemplate(
  req: Request,
  res: Response,
  templateName: string,
  options?: { [key: string]: any },
  statusCode?: number
) {
  let data: { [key: string]: any } = {
    ...(options || {}),
    url: req.originalUrl
  };
  if (req.user) {
    let user = req.user as User;
    if (!user.isAdmin) {
      data.user = user;
    } else {
      data.admin = user;
    }
  }
  res.status(statusCode ?? 200).render(templateName, data);
}

export default renderTemplate;
