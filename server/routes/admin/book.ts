import { Router, Response, Request } from "express";
import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";
import fetch from "node-fetch";
import { Book } from "../../entities/Book";
import { Category } from "../../entities/Category";
import EntityHelpers from "../../entities/helpers";
import { BookType } from "../../entities/BookType";
import { BookLanguage } from "../../entities/BookLanguage";
import { Tag } from "../../entities/Tag";
import csv from "csv-parser";
import { redirectWithOption, getRedirectOption } from "../helpers";
import renderTemplate from "../../utils/renderTemplate";
let router = Router();

function uploadImage(rawData: string) {
  const formData = new FormData();
  formData.append("image", rawData);
  formData.append("type", "base64");
  return fetch("https://api.imgur.com/3/upload", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
    },
    body: formData
  });
}

function uploadImageAndSave(file: formidable.File, book: Book, req: Request, res: Response, next) {
  fs.readFile(file.path, { encoding: "base64" }, async function (err, data) {
    if (err) {
      next(err);
      return;
    }
    try {
      const response = await uploadImage(data);
      const responseJson = await response.json();
      if (responseJson.success) {
        book.coverImage = responseJson.data.link;
        await book.save();
        redirectWithOption(req, res, "/admin/book", {
          successMessage: "Thêm sách thành công"
        });
      } else {
        next(new Error(`Không upload image lên imgur được: ${responseJson.status}`));
      }
    } catch (err) {
      next(err);
    }
  });
}

function uploadImageAndUpdate(
  file: formidable.File,
  newBook: Book,
  req: Request,
  res: Response,
  next
) {
  fs.readFile(file.path, { encoding: "base64" }, async function (err, data) {
    if (err) {
      next(err);
      return;
    }
    try {
      const response = await uploadImage(data);
      const responseJson = await response.json();
      if (responseJson.success) {
        newBook.coverImage = responseJson.data.link;
        await Book.save(newBook);
        redirectWithOption(req, res, "/admin/book", {
          successMessage: "Cập nhật sách thành công"
        });
      } else {
        next(new Error(`Không upload image lên imgur được: ${responseJson.status}`));
      }
    } catch (err) {
      next(err);
    }
  });
}

async function renderBookForm(req: Request, res: Response, options = {}, action = "new") {
  const redirectOption = getRedirectOption(req);
  const categories = await EntityHelpers.getAll(Category);
  const types = await EntityHelpers.getAll(BookType);
  const languages = await EntityHelpers.getAll(BookLanguage);
  const tags = await EntityHelpers.getAll(Tag);
  if (!options["book"]) options["book"] = {};

  renderTemplate(req, res, `admin-book.${action}.html`, {
    types,
    categories,
    languages,
    tags,
    ...options,
    ...redirectOption
  });
}

router.get("/", async function (req, res) {
  let options = getRedirectOption(req);
  const books = await Book.getAllWithRelations();
  renderTemplate(req, res, "admin-book.html", {
    books,
    ...options
  });
});

router.get("/new", async function (req, res) {
  renderBookForm(req, res);
});

router.post("/", function (req, res) {
  function next(err) {
    redirectWithOption(req, res, `/admin/book/new`, {
      errorMessage: err.message
    });
  }
  let form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    if (err) {
      next(err);
      return;
    }
    const { file } = files;
    try {
      const book = await Book.parseBook(fields);
      if (file.size > 0) {
        uploadImageAndSave(file, book, req, res, next);
      } else {
        throw new Error("No image was uploaded!");
      }
    } catch (err) {
      next(err);
    }
  });
  form.once("error", next);
});

router.get("/edit/:id", async function (req, res) {
  try {
    const book = await Book.findOneWithRelations(Number(req.params.id));
    renderBookForm(req, res, { book }, "edit");
  } catch (err) {
    redirectWithOption(req, res, "admin-book.html", {
      errorMessage: err.message
    });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const book = await Book.findOneWithRelations(Number(req.params.id));
    const next = (err) => {
      redirectWithOption(req, res, `/admin/book/edit/${book.id}`, {
        errorMessage: err
      });
    };
    let form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      if (err) {
        next(err);
        return;
      }
      const { file } = files;
      try {
        const newBook = await Book.parseBook(fields, book);
        if (file.size > 0) {
          uploadImageAndUpdate(file, newBook, req, res, next);
        } else {
          newBook.coverImage = book.coverImage;
          await Book.save(newBook);
          redirectWithOption(req, res, "/admin/book", {
            successMessage: "Cập nhật sách thành công"
          });
        }
      } catch (err) {
        next(err);
      }
    });
    form.once("error", next);
  } catch (err) {
    redirectWithOption(req, res, "/admin/book", {
      errorMessage: err.message
    });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const book = await Book.findOneWithRelations(Number(req.params.id));
    await Book.delete(book.id);
    redirectWithOption(req, res, "/admin/book", {
      successMessage: "Đã xóa sách thành công"
    });
  } catch (err) {
    redirectWithOption(req, res, "/admin/book", {
      errorMessage: err.message
    });
  }
});

router.get("/import", function (req, res) {
  const options = getRedirectOption(req);
  renderTemplate(req, res, "admin-book.import.html", options);
});

router.post("/import", function (req, res) {
  function next(err) {
    redirectWithOption(req, res, "/admin/book/import", {
      errorMessage: err.message
    });
  }

  let form = new formidable.IncomingForm();
  form.parse(req, function (err, _, files) {
    if (err) {
      next(err);
      return;
    }
    let { file } = files;
    let rawBookList = [];
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("error", next)
      .on("data", function (rawBook) {
        rawBookList.push({
          ...rawBook
        });
      })
      .on("end", async function () {
        try {
          await Promise.allSettled(
            rawBookList.map(async (book) => (await Book.parseBook(book)).save())
          );
          redirectWithOption(req, res, "/admin/book/import", {
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
