import express from "express";
import { Comment } from "../entities/Comment";
import nunjucks from "nunjucks";
import { Book } from "../entities/Book";
import renderTemplate from "../utils/renderTemplate";
import { requireAuth } from "../middlewares/auth";

var router = express.Router();

async function getRepliesHTML(commentId, bookId): Promise<string> {
  const replies = await Comment.getReplies(commentId);
  await Promise.allSettled(replies.map((reply) => reply.setRepliesCount()));
  if (replies.length === 0) throw new Error("Bình luận không tồn tại");
  const template = nunjucks.render("partials/book.comments.html", {
    comments: replies,
    isTopLevel: false,
    bookId
  });
  return template;
}

router.get("/:bookId/comments/:id/replies", async function (req, res) {
  try {
    const bookId = Number(req.params.bookId);
    const book = await Book.findOneOrFail(bookId, { relations: ["comments"] });
    const template = await getRepliesHTML(Number(req.params.id), bookId);
    res.send(template);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

function getCommentResponse(comment: Comment, bookId, isTopLevel): any {
  const template = nunjucks.render("partials/book.comment.html", {
    comment,
    bookId,
    isTopLevel,
    isResponse: true,
    flash: {
      type: "success",
      content: "Đã thêm bình luận thành công"
    }
  });
  return {
    template,
    id: comment.id
  };
}

router.post("/:bookId/comments/:parentId?/create", requireAuth, async function (req, res){
  try {
    const book = await Book.findOneOrFail(Number(req.params.bookId), { relations: ["comments"] });
    const next = (err) => {
      const template = nunjucks.render("flash.html", {
        flash: {
          type: "error",
          content: err.message
        }
      });
      res.status(404).json({ template });
    };
    const fields = req.body;
    try {
      const comment = new Comment();
      if (typeof fields.content != "string") throw new Error("Don't do that");
      comment.content = fields.content as string;
      comment.createdAt = new Date();
      let isTopLevel = true;
      if (req.params.parentId) {
        const parentComment = book.comments.find(
          (comment) => comment.id === Number(req.params.parentId)
        );
        if (!parentComment) throw new Error("Không tìm thấy bình luận cha");
        comment.parent = parentComment;
        isTopLevel = false;
      }
      comment.book = book;
      comment.user = res.locals.user;
      await comment.save();
      const response = getCommentResponse(comment, book.id, isTopLevel);
      res.json(response);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    renderTemplate(
      req,
      res,
      "index",
      {
        title: "Homepage",
        flash: {
          type: "error",
          content: err
        }
      },
      404
    );
  }
});
export default router;
