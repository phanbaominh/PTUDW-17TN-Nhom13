// IMPORTANT: IN ORDER FOR THIS SEED TO BE EXECUTED LAST, SEED FILE MUST BE NAMED TO BE LAST ALPHABETICALLY

import { Factory, Seeder } from 'typeorm-seeding'
import { Connection, BaseEntity } from 'typeorm'
import { Book } from '../entities/Book'
import { BookLanguage } from '../entities/BookLanguage'
import { BookType } from '../entities/BookType'
import { Category } from '../entities/Category'
import { Tag } from '../entities/Tag'
import EntityHelpers from '../entities/helpers'

const getRand = EntityHelpers.getRand;
class CreateBooks implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Book)()
      .map(async (book: Book) => {
        book.language = (await getRand<BookLanguage>(BookLanguage))[0];
        book.type = (await getRand<BookType>(BookType))[0];
        book.category = (await getRand<Category>(Category))[0];
        book.tags = await getRand(Tag, 3);
        return book;
      })
      .createMany(30);
  }
}

module.exports = {
  CreateBooks,
}