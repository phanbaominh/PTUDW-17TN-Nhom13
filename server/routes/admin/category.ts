import { Router } from "express";
import formidable from "formidable";
import fs from "fs";
import renderTemplate from "../../utils/renderTemplate";
import { Category } from "../../entities/Category";
import { redirectWithOption, getRedirectOption } from "../helpers";
import uploadImage from "../../utils/uploadImage";

let router = Router();

async function parseCategory(
  fields: formidable.Fields,
  files: formidable.Files,
  requireImage = true,
) {
  if (
    typeof fields.name !== "string" ||
    typeof fields.position !== "string" ||
    typeof fields.desc !== "string" ||
    isNaN(parseInt(fields.position))
  ) {
    throw "Don't do that";
  }

  let name = fields.name;
  let position = parseInt(fields.position);
  let desc = fields.desc;

  let url = "";
  let image = files.image;

  if (image.size === 0 && requireImage) {
    throw "Cần phải upload ảnh đại diện cho thể loại";
  }
  if (image.size > 0) {
    let rawImage = fs.readFileSync(files.image.path, { encoding: "base64" });
    let imgurResponse = await uploadImage(rawImage).then((res) => res.json());
    if (imgurResponse.success) {
      url = imgurResponse.data.link;
    } else {
      throw `Không upload image lên imgur được: ${imgurResponse.status}`;
    }
  }

  return {
    name,
    position,
    desc,
    image: url,
  };
}

router.get("/", async function (req, res) {
  let categoryList = await Category.find({
    order: {
      id: "ASC",
    },
  });
  let redirectOption = getRedirectOption(req);
  renderTemplate(req, res, "admin-category.html", {
    categoryList,
    ...redirectOption,
  });
});

router.post("/", function (req, res) {
  function next(err) {
    redirectWithOption(req, res, "/admin/category", {
      errorMessage: err.message,
    });
  }

  let form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    try {
      if (err) {
        throw err;
      }
      let { name, position, desc, image } = await parseCategory(fields, files);

      let category = new Category();
      category.name = name;
      category.position = position;
      category.desc = desc;
      category.image = image;

      await category.save();

      redirectWithOption(req, res, "/admin/category", {
        successMessage: "Thêm thể loại mới thành công",
      });
    } catch (err) {
      if (typeof err === "string") {
        next({ message: err });
      } else {
        next({ message: "Lỗi hệ thống" });
      }
    }
  });
});

router.put("/:id", async function (req, res) {
  function next(err) {
    redirectWithOption(req, res, "/admin/category", {
      errorMessage: err.message,
    });
  }

  let categoryId = parseInt(req.params.id);
  if (isNaN(categoryId)) {
    return next({ message: "Don't do that" });
  }

  let form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    try {
      if (err) {
        throw err;
      }
      let { name, position, desc, image } = await parseCategory(fields, files, false);

      await Category.update(
        { id: categoryId },
        {
          name,
          position,
          desc,
          ...(image && { image }),
        },
      );

      redirectWithOption(req, res, "/admin/category", {
        successMessage: "Cập nhật thành công",
      });
    } catch (err) {
      if (typeof err === "string") {
        next({ message: err });
      } else {
        next({ message: "Lỗi hệ thống" });
      }
    }
  });
});

export default router;
