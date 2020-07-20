import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../../entities/User";

let router = Router();

router.get("/update-password", function (_, res) {
  res.render("admin-update-password.html");
});

router.post("/update-password", async function (req, res) {
  function next(err: Error) {
    res.status(400).render("admin-update-password.html", {
      errorMessage: err.message
    });
  }

  let {
    password,
    newPassword,
    newPassword2
  }: {
    password: string;
    newPassword: string;
    newPassword2: string;
  } = req.body;
  if (
    typeof password !== "string" ||
    typeof newPassword !== "string" ||
    typeof newPassword2 !== "string"
  ) {
    next(new Error("Don't do that"));
    return;
  }

  if (newPassword !== newPassword2) {
    next(new Error("Mật khẩu không khớp"));
    return;
  }

  let currentUsername = (res.locals.admin as User).username;
  let currentUser = await User.findOne({ username: currentUsername });

  if (!bcrypt.compareSync(password, currentUser.password)) {
    next(new Error("Mật khẩu cũ không đúng"));
    return;
  }

  currentUser.password = newPassword;
  currentUser
    .save()
    .then(function () {
      res.render("admin-update-password.html", {
        successMessage: "Cập nhật thành công"
      });
    })
    .catch(next);
});

export default router;
