import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { User } from "../entities/User";
import UserNotification from "../entities/UserNotification";

let router = Router();

router.put("/read", requireAuth, async function (req, res, next) {
  let user = req.user as User;
  if (user.isAdmin) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  await UserNotification.update({ user }, { read: true });
  res.json({});
});

export default router;
