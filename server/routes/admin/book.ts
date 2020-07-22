import { Router } from "express";
import formidable from "formidable";
import fs from "fs";

let router = Router();

router.get("/", function (_, res) {
  res.render("admin-book.html");
});

router.get("/new", function (_, res) {
  res.render("admin-book.new.html");
});

router.get("/update", function (_, res) {
  res.render("admin-book.update.html");
});

router.post("/new", function (req, res) {
  function next(err) {
    res.render("admin-book.new.html", {
      errorMessage: err
    });
  }

  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      next(err);
      return;
    }
    console.log('fields:', fields);
    console.log('files:', files);
    const { file } = files;
    let tmp;
    console.log('path:', file.path);
    fs.createReadStream(file.path)
      .on("error", next)
      .on("data", function (data) {
        console.log('image_data:', data);
        tmp = data;
        // Default password = phone
        // rawUserList.push({
        //   ...rawUser,
        //   password: rawUser.phone,
        //   birthdate: new Date(rawUser.birthdate)
        // });
      })
      .on("end", async function () {
        try {
          // await Promise.allSettled(rawUserList.map((user) => parseUser(user).save()));
          console.log('ending');
          console.log('tmp:', tmp);
          res.render("admin-book.new.html", {
            successMessage: "Đã import thành công"
          });
        } catch (err) {
          next(err);
        }
      });
  })
  form.once("error", next);
});

export default router;
