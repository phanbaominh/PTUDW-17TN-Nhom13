import { Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BookType } from "../entities/BookType";

let DUMMY_BOOK_TYPE_LIST: Array<QueryDeepPartialEntity<BookType>> = [
  { name: "Sách" },
  { name: "Bài báo khoa học" },
  { name: "Tạp chí khoa học" },
];

class CreateBookTypes implements Seeder {
  public async run(_, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(BookType)
      .values(DUMMY_BOOK_TYPE_LIST)
      .execute();
  }
}

module.exports = {
  CreateBookTypes,
};
