import { Router } from "express";
import renderTemplate from "../utils/renderTemplate";
import News from "../entities/News";
import { redirectWithOption } from "./helpers";
import { Not } from "typeorm";

let router = Router();

router.get("/:slug", async function (req, res) {
  let slug = req.params.slug;
  let news = await News.findOne({ slug });
  if (!news) {
    return redirectWithOption(req, res, "/", {
      flash: {
        type: "error",
        content: "Thông báo không tồn tại",
      },
    });
  }

  let relatedNewsList = await News.find({
    where: {
      id: Not(news.id),
    },
    take: 4,
    order: {
      date: "DESC",
    },
  });

  renderTemplate(req, res, "news-detail", {
    title: news.title,
    news,
    relatedNewsList,
  });
});

export default router;
