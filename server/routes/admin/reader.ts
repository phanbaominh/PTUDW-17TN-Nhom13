import { Router } from "express";
import formidable from "formidable";
import fs from "fs";
import csv from "csv-parser";
import { parseUser } from "../../entities/User";

let router = Router();

router.get("/", function (_, res) {
  res.render("admin-reader.html");
});

router.post("/", function (req, res) {
  function next(err) {
    res.render("admin-reader.html", {
      errorMessage: err
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
          birthdate: new Date(rawUser.birthdate)
        });
      })
      .on("end", async function () {
        try {
          await Promise.allSettled(rawUserList.map((user) => parseUser(user).save()));
          res.render("admin-reader.html", {
            successMessage: "Đã import thành công"
          });
        } catch (err) {
          next(err);
        }
      });
  });
  form.once("error", next);
});

export default router;
