import { Seeder, Factory } from "typeorm-seeding";
import { Connection } from "typeorm";
import { BorrowCard } from "../entities/BorrowCard";
import { User } from "../entities/User";
import { Book } from "../entities/Book";
import EntityHelpers from "../entities/helpers";
const getRand = EntityHelpers.getRand;
class CreateBorrowCards implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any>{
    await factory(BorrowCard)()
      .map(async (card: BorrowCard) => {
        card.user = (await getRand<User>(User))[0];
        card.book = (await getRand<Book>(Book))[0];
        return card
      })
      .createMany(30);
  }
}

module.exports = {
  CreateBorrowCards,
}