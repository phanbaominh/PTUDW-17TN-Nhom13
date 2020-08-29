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
    pathname: req.originalUrl.split("?")[0],
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
    let notificationList = await UserNotification.find({
      where: {
        user: req.user,
      },
      order: {
        createdAt: "DESC",
      },
    });
    data.notificationList = notificationList;
    data.unreadNotificationCount = 0;
    for (let noti of notificationList) {
      if (!noti.read) {
        data.unreadNotificationCount += 1;
      }
    }
  } else {
    data.notificationList = [];
    data.unreadNotificationCount = 0;
  }

  res.status(statusCode ?? 200).render(templateName, data);
}

export default renderTemplate;
