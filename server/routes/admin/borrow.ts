import { Router, Request, Response } from "express";
import renderTemplate from "../../utils/renderTemplate";
import { BorrowCard, BorrowStatus } from "../../entities/BorrowCard";
import { getRedirectOption, redirectWithOption } from "../helpers";
import { Book } from "../../entities/Book";
import formidable from "formidable";
import { User } from "../../entities/User";

let router = Router();

router.get("/", async function (req, res) {
  const options = getRedirectOption(req);
  const borrowCards = await BorrowCard.getAllWithRelations();
  renderTemplate(req, res, "admin-borrow.html", {
    borrowCards,
    ...options,
  });
});

async function renderBorrowForm(req: Request, res: Response, options = {}, action = "new") {
  const redirectOption = getRedirectOption(req);
  const bookIds = await Book.createQueryBuilder("book").select("book.id").getMany();
  const usernames = await User.createQueryBuilder("user").select("user.username").getMany();
  const statuses = Object.values(BorrowStatus).map(status => ({ name: status }));
  if (!options["card"]) options["card"] = {};

  renderTemplate(req, res, `admin-borrow.${action}.html`, {
    bookIds,
    usernames,
    statuses,
    ...options,
    ...redirectOption
  });
}

router.get("/edit/:id", async function (req, res) {
  try {
    const card = await BorrowCard
      .createQueryBuilder("card")
      .leftJoinAndSelect("card.user", "user")
      .leftJoinAndSelect("card.book", "book")
      .leftJoinAndSelect("book.category", "cat")
      .where(":id = card.id", { id: Number(req.params.id) })
      .getOne();
    if (!card) throw `Không tồn tại sách với ${req.params.id}`;
    renderBorrowForm(req, res, { card }, "edit");
  } catch (err) {
    redirectWithOption(req, res, "admin-borrow.html", {
      errorMessage: err
    });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const card =  await BorrowCard.findOneWithRelations(Number(req.params.id));
    const next = (err) => {
      redirectWithOption(req, res, `/admin/borrow/edit/${card.id}`, {
        errorMessage: err.message,
      });
    };
    let form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      if (err) {
        next(err);
        return;
      }
      try {
        const newCard = await BorrowCard.parseBorrowCard(fields, card);
        await BorrowCard.save(newCard);
          redirectWithOption(req, res, "/admin/borrow", {
            successMessage: "Cập nhật thẻ mượn thành công"
          });
      } catch (err) {
        next(err);
      }
    });
    form.once("error", next);
  } catch (err) {
    redirectWithOption(req, res, "/admin/borrow", {
      errorMessage: err.message,
    });
  }
});

router.put("/quick/:id", async function (req, res){
  try {
    const card =  await BorrowCard.findOneOrFail(Number(req.params.id), { relations: ["book"] });;
    if (BorrowCard.isTakeBook(card.status)){
      let msg;
      if (card.status === BorrowStatus.REQUESTED) {
        card.status = BorrowStatus.BORROWED;
        msg = "Xác nhận mượn sách thành công";
      } else {
        card.status = BorrowStatus.RETURNED;
        msg = "Xác nhận trả sách thành công";
      }
      await BorrowCard.save(card);
      redirectWithOption(req, res, "/admin/borrow", {
        successMessage: msg,
      })
    } else {
      redirectWithOption(req, res, "/admin/borrow", {
        errorMessage: "Yêu cầu không hợp lý",
      })
    }
  } catch (err) {
    redirectWithOption(req, res, "/admin/borrow", {
      errorMessage: err.message,
    })
  }
  
});

router.delete("/:id", async function (req, res){
  try {
    const card = await BorrowCard.findOneOrFail(Number(req.params.id), { relations: ["book"] });
    await BorrowCard.save(card);
    redirectWithOption(req, res, "/admin/borrow", {
      successMessage: "Hủy thẻ mượn sách thành công",
    })
  } catch (err) {
    redirectWithOption(req, res, "/admin/borrow", {
      errorMessage: err.message,
    })
  }
});

export default router;
