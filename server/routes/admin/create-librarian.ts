import { Router } from "express";
import { User } from "../../entities/User";

let router = Router();

interface RequestBodyType {
  username: string;
  password: string;
  password2: string;
  fullname: string;
  email: string;
}

router.get("/create-librarian", function (_, res) {
  res.render("admin-create-librarian.html");
});

router.post("/create-librarian", function (req, res) {
  function next(err: Error) {
    res.status(400).render("admin-create-librarian.html", {
      errorMessage: err.message
    });
  }

  let { username, password, password2, fullname, email }: RequestBodyType = req.body;
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof fullname !== "string" ||
    typeof email !== "string"
  ) {
    next(new Error("Don't do that"));
    return;
  }

  if (password !== password2) {
    next(new Error("Mật khẩu không khớp"));
    return;
  }

  let user = new User();
  user.username = username;
  user.password = password;
  user.fullname = fullname;
  user.email = email;
  user.profilePicture = "";
  user.birthdate = new Date();
  user.gender = "admin-gender";
  user.phone = "0123456789";
  user.address = "";
  user.isAdmin = true;

  user
    .save()
    .then(function () {
      res.render("admin-create-librarian.html", {
        successMessage: "Tạo tài khoản thành công"
      });
    })
    .catch(next);
});

export default router;
