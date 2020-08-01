import { Category } from "./entities/Category";
import { BookType } from "./entities/BookType";
import { BookLanguage } from "./entities/BookLanguage";
import { Tag } from "./entities/Tag";
import { Book } from "./entities/Book";

async function testDB() {
  const category = new Category();
  category.name = 'test_cat';
  category.desc = 'test_desc';
  category.image = 'test_image';
  await category.save();

  const type = new BookType();
  type.name = 'test_type';
  await type.save();

  const language = new BookLanguage();
  language.name = 'language_type';
  await language.save();

  const tag = new Tag();
  tag.name = 'test_tag';
  await tag.save();

  const tag2 = new Tag();
  tag2.name = 'test_tag2';
  await tag2.save();

  const book = new Book();
  book.category = category;
  book.type = type;
  book.language = language;
  book.tags = [tag, tag2];
  book.testimonial = '{}';
  book.pageCount = 300;
  book.publisher = 'minh';
  book.publishingYear = 1999;
  book.createdAt = new Date();
  book.bookCount = 1;
  book.coverImage = '';
  book.author = '';
  book.desc = '';
  book.title = 'abc';
  await book.save();

  console.log(JSON.stringify(Book.find({title: 'abc'}), null, 2));

  await book.remove();
  await tag2.remove();
  await tag.remove();
  await language.remove();
  await type.remove();
  await category.remove();
}
export { testDB };

