import { Seeder, Factory } from "typeorm-seeding";
import { Connection } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BookLanguage } from "../entities/BookLanguage";
let DUMMY_BOOK_LANGUAGE_LIST: Array<QueryDeepPartialEntity<BookLanguage>> = [
  {
    name: "Tiếng Việt"
  },
  {
    name: "Tiếng Anh",
  },
];

class CreateBookLanguages implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(BookLanguage)
      .values(DUMMY_BOOK_LANGUAGE_LIST)
      .execute()
  }
}

module.exports = {
  CreateBookLanguages,
};
