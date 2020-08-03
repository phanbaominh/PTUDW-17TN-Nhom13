import { Seeder, Factory } from "typeorm-seeding";
import { Connection } from "typeorm";
import { BorrowCard } from "../entities/BorrowCard";
import { User } from "../entities/User";
import { Book } from "../entities/Book";

class CreateBorrowCards implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any>{
    const users = await User.find();
    const books = await Book.find();
    let userIndex = 0;
    let bookIndex = 0;
    await factory(BorrowCard)()
      .map(async (card: BorrowCard) => {
        card.user = users[userIndex];
        card.book = books[bookIndex];
        userIndex = (userIndex + 1) % users.length;
        bookIndex = (bookIndex + 1) % books.length;
        return card;
      })
      .createMany(30);
  }
}

module.exports = {
  CreateBorrowCards,
}