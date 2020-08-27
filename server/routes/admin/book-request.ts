import { Router } from "express";
import renderTemplate from "../../utils/renderTemplate";
import BookRequest from "../../entities/BookRequest";

let router = Router();

router.get("/", async function (req, res) {
  let requestList = await BookRequest.getAll();
  renderTemplate(req, res, "admin-book-request.html", {
    requestList,
  });
});

router.put("/:id", async function (req, res) {
  let requestId = parseInt(req.params.id);
  if (isNaN(requestId)) {
    res.status(400).json({
      message: "Don't do that",
    });
    return;
  }

  await BookRequest.update({ id: requestId }, { isDone: true });
  res.json({
    message: "Success",
  });
});

export default router;
