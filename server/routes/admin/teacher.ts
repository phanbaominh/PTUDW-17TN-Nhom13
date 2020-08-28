import { Router } from "express";
import formidable from "formidable";
import fs from "fs";
import csv from "csv-parser";
import { User } from "../../entities/User";
import renderTemplate from "../../utils/renderTemplate";

let router = Router();

router.get("/", function (req, res) {
  renderTemplate(req, res, "admin-teacher.html");
});

router.post("/", function (req, res) {
  function next(err) {
    renderTemplate(req, res, "admin-teacher.html", {
      errorMessage: err,
    });
  }

  let form = new formidable.IncomingForm();
  form.parse(req, function (err, _, files) {
    if (err) {
      next(err);
      return;
    }
    let { file } = files;
    let rawUserList = [];
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("error", next)
      .on("data", function (rawUser) {
        // Default password = phone
        rawUserList.push({
          ...rawUser,
          password: rawUser.phone,
          birthdate: new Date(rawUser.birthdate),
        });
      })
      .on("end", async function () {
        try {
          await Promise.allSettled(
            rawUserList.map((user) => {
              let teacher = User.parseUser(user);
              teacher.isTeacher = true;
              return teacher.save();
            }),
          );
          renderTemplate(req, res, "admin-teacher.html", {
            successMessage: "Đã import thành công",
          });
        } catch (err) {
          next(err);
        }
      });
  });
  form.once("error", next);
});

export default router;
