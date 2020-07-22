import { Seeder, Factory } from "typeorm-seeding";
import { Connection } from "typeorm";
import { BookType } from "../entities/BookType";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
let DUMMY_BOOK_TYPE_LIST: Array<QueryDeepPartialEntity<BookType>> = [
  {
    name: "Sách"
  },
  {
    name: "Bài báo khoa học",
  },
  {
    name: "Tạp chí khoa học",
  },
];

class CreateBookTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(BookType)
      .values(DUMMY_BOOK_TYPE_LIST)
      .execute()
  }
}

module.exports = {
  CreateBookTypes,
};