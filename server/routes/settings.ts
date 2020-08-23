import { Router } from "express";
import fs from "fs";
import formidable from "formidable";
import renderTemplate from "../utils/renderTemplate";
import { requireAuth } from "../middlewares/auth";
import { getRedirectOption, redirectWithOption } from "./helpers";
import { User } from "../entities/User";
import uploadImage from "../utils/uploadImage";

let router = Router();

router.get("/settings", requireAuth, function (req, res) {
  renderTemplate(req, res, "settings", {
    title: "Settings",
    ...getRedirectOption(req),
  });
});

router.put("/profile", requireAuth, async function (req, res) {
  type RequestBody = {
    currentPassword: string;
    newPassword: string;
    newPassword1: string;
  };
  try {
    let { currentPassword, newPassword, newPassword1 }: RequestBody = req.body;
    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      typeof newPassword1 !== "string" ||
      !res.locals.user
    ) {
      throw new Error("Don't do that");
    }

    let currentUser = res.locals.user as User;
    if (!currentUser.checkPassword(currentPassword)) {
      throw new Error("Mật khẩu cũ không đúng");
    }
    if (newPassword !== newPassword1) {
      throw new Error("Mật khẩu mới không khớp");
    }

    currentUser.password = newPassword;
    await currentUser.save();

    redirectWithOption(req, res, "/settings", {
      flash: {
        type: "success",
        content: "Mật khẩu đã được cập nhật thành công",
      },
    });
  } catch (err) {
    redirectWithOption(req, res, "/settings", {
      flash: {
        type: "error",
        content: err.message,
      },
    });
  }
});

router.put("/profile-pfp", requireAuth, function (req, res) {
  console.log("===================================");
  function next(err: Error) {
    redirectWithOption(req, res, "/settings", {
      flash: {
        type: "error",
        content: err.message,
      },
    });
  }

  if (!res.locals.user) {
    next(new Error("Don't do that"));
    return;
  }

  let form = new formidable.IncomingForm();
  form.parse(req, async function (err, _, files) {
    try {
      if (err) {
        throw err;
      }
      let { file } = files;
      let rawImage = fs.readFileSync(file.path, { encoding: "base64" });
      let imgurResponse = await uploadImage(rawImage).then((res) => res.json());
      if (!imgurResponse.success) {
        // Cannot upload to imgur, display Internal Server Error to user
        throw new Error("Lỗi hệ thống");
      }
      let url = imgurResponse.data.link;

      let currentUser = res.locals.user as User;
      await User.update(
        {
          username: currentUser.username,
        },
        {
          profilePicture: url,
        },
      );

      redirectWithOption(req, res, "/settings", {
        flash: {
          type: "success",
          content: "Cập nhật ảnh đại diện thành công",
        },
      });
    } catch (err) {
      next(err);
    }
  });
});

export default router;
