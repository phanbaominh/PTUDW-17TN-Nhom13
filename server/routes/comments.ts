import express from "express";
import { Comment } from "../entities/Comment";
import nunjucks from "nunjucks";

var router = express.Router();

router.get("/comments/:id/replies", async function (req, res){
  try {
    const replies = await Comment.getReplies(Number(req.params.id));
    if (replies.length === 0) throw new Error("Bình luận không tồn tại");
    const template = nunjucks.render("partials/book.comments.html", {
      comments: replies,
      isTopLevel: false,
    })
    res.send(template);
  } catch (err) {
    res.status(404).send(err.message);
  }
});
export default router;