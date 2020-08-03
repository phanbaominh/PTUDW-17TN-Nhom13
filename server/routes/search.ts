import { Router, Request } from "express";
import renderTemplate from "../utils/renderTemplate";
import { Category } from "../entities/Category";
import { BookLanguage } from "../entities/BookLanguage";
import { BookType } from "../entities/BookType";
import { Environment } from "nunjucks";
import { Book } from "../entities/Book";

let router = Router();
let PAGE_SIZE = 4;

router.use(function (_, res, next) {
  let engine: Environment | null = res.app.get("engine");
  engine?.addFilter("addParam", function (params: Record<string, any>, key: string, value: any) {
    let nonVoidParams: Record<string, any> = {};
    for (let key in params) {
      let value = params[key];
      if (key !== "page" && value !== undefined) {
        nonVoidParams[key] = value;
      }
    }
    if (value !== nonVoidParams[key]) {
      nonVoidParams[key] = value;
    } else {
      delete nonVoidParams[key];
    }
    return new URLSearchParams(nonVoidParams).toString();
  });
  next();
});

type SearchParams = {
  q: string;
  categoryId?: number;
  languageId?: number;
  bookTypeId?: number;
  sort: string;
  page: number;
};

function parseSearchParamsFromRequest(req: Request): SearchParams {
  let { q: query, categoryId, languageId, bookTypeId, sort = "date", page = 1 } = req.query;
  if (typeof query !== "string") {
    throw new Error("query must be a string");
  }
  if (typeof sort !== "string") {
    throw new Error("sort must be a string");
  }
  return {
    q: query,
    categoryId: Number(categoryId) || undefined,
    languageId: Number(languageId) || undefined,
    bookTypeId: Number(bookTypeId) || undefined,
    sort,
    page: Number(page) || 1
  };
}

async function queryBooks(
  params: SearchParams
): Promise<{ bookList: Book[]; bookCount: number; pageCount: number }> {
  let query = Book.createQueryBuilder("book")
    .innerJoinAndSelect("book.category", "category")
    .innerJoinAndSelect("book.language", "language")
    .innerJoinAndSelect("book.type", "type");
  if (params.categoryId) {
    let categoryId = params.categoryId;
    console.log({ categoryId, x: typeof categoryId });
    query = query.andWhere("category.id = :categoryId", { categoryId });
  }
  if (params.languageId) {
    let languageId = params.languageId;
    query = query.andWhere("language.id = :languageId", { languageId });
  }
  if (params.bookTypeId) {
    let bookTypeId = params.bookTypeId;
    query = query.andWhere("type.id = :bookTypeId", { bookTypeId });
  }
  query = query.leftJoinAndSelect("book.tags", "_tag");
  query = query.leftJoinAndSelect("book.tags", "tag");

  query = query.andWhere(
    "(book.author like :q OR book.title like :q OR book.publisher like :q OR category.name like :q OR _tag.name like :q)",
    { q: "%" + params.q + "%" }
  );

  let bookCount = await query.getCount();

  switch (params.sort) {
    case "date":
      query = query.orderBy("book.createdAt", "DESC");
      break;
    case "borrow-count":
      // TODO: handle sort by borrow count
      break;
    case "publish-year":
      query = query.orderBy("book.publishingYear", "DESC");
      break;
  }

  query = query.skip((params.page - 1) * PAGE_SIZE);
  query = query.take(PAGE_SIZE);
  return {
    bookList: await query.getMany(),
    bookCount,
    pageCount: Math.ceil(bookCount / PAGE_SIZE)
  };
}

router.get("/", async function (req, res) {
  try {
    let params = parseSearchParamsFromRequest(req);

    let categoryList = await Category.find({
      order: {
        id: "ASC"
      }
    });
    let languageList = await BookLanguage.find({
      order: {
        name: "ASC"
      }
    });
    let bookTypeList = await BookType.find({
      order: {
        name: "ASC"
      }
    });

    let { bookList, bookCount, pageCount } = await queryBooks(params);
    let pagination = {
      total: pageCount,
      min: Math.max(1, params.page - 2),
      max: Math.min(pageCount, params.page + 2),
      page_size: PAGE_SIZE,
      minBook: (params.page - 1) * PAGE_SIZE + 1,
      maxBook: Math.min(bookCount, params.page * PAGE_SIZE)
    };

    renderTemplate(req, res, "search", {
      title: "Search",
      params,
      pagination,
      bookList,
      categoryList,
      languageList,
      bookTypeList
    });
  } catch (err) {
    console.log(err);
    renderTemplate(req, res, "search.html", {
      flash: {
        type: "error",
        content: "Lỗi hệ thống"
      }
    });
  }
});

export default router;
