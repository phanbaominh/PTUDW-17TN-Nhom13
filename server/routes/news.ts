import { Router } from "express";

let router = Router();

router.get("/:slug", function (req, res, next) {
  let slug = req.params.slug;
  // TODO: fetch news with given slug

  res.render("news-detail", {
    title: "Thông báo lịch phỏng vấn xét tuyển đào tạo bậc thạc sĩ năm 2020 đợt 1"
  });
});

export default router;
