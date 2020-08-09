import { Request, Response } from "express";
import { User } from "../entities/User";
import UserNotification from "../entities/UserNotification";

async function renderTemplate(
  req: Request,
  res: Response,
  templateName: string,
  options?: { [key: string]: any },
  statusCode?: number,
) {
  // Inject URL
  let data: { [key: string]: any } = {
    ...(options || {}),
    url: req.originalUrl,
  };

  // Inject current user
  if (req.user) {
    let user = req.user as User;
    if (!user.isAdmin) {
      data.user = user;
    } else {
      data.admin = user;
    }
  }

  // Inject notifications
  if (req.user && !(req.user as User).isAdmin) {
    data.notificationList = await UserNotification.find({
      where: {
        user: req.user,
      },
      order: {
        createdAt: "DESC",
      },
    });
  } else {
    data.notificationList = [];
  }

  res.status(statusCode ?? 200).render(templateName, data);
}

export default renderTemplate;
