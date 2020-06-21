import _ from "lodash";
import hbs from "hbs";
import Chance from "chance";
import Category, { DUMMY_CATEGORY_LIST } from "./Category";

const chance = new Chance();

interface Book {
  readonly id: number;
  title: string;
  desc: string;
  coverImage: string;
  type: string;
  author: string;
  language: string;
  category: Category;
  remain: number;
  tagList: Array<string>;
}

const dummyTitleList = [
  "A book with a really long title, over five words long",
  "A book with a medium length title",
  "A short book"
];
const dummyLanguageList = ["English", "Tiếng Việt"];
const dummyTypeList = ["Sách", "Bài báo khoa học", "Tạp chí khoa học"];
const dummyAuthorList = ["Remember Forest", "Handsome Sea", "Bright Treasure"];
const dummyCoverImageList = [
  "lizard.jpg",
  "cong-nghe-phan-mem.jpg",
  "cong-nghe-tri-thuc.jpg",
  "mang-may-tinh.jpg",
  "he-thong-thong-tin.jpg",
  "khoa-hoc-may-tinh.png",
  "thi-giac-may-tinh.jpg",
].map(path => `/images/book__${path}`);
const dummyTagList = ["Ubuntu 18.04", "Flask"];

function randomChoice(things: any[]) {
  return things[Math.floor(Math.random() * things.length)];
}

function createBookList(n: number) {
  let books: Book[] = [];
  let currentId = 0;
  for (let i = 0; i < n; i++) {
    books.push({
      id: ++currentId,
      title: randomChoice(dummyTitleList),
      desc: chance.paragraph(),
      author: randomChoice(dummyAuthorList),
      coverImage: randomChoice(dummyCoverImageList),
      language: randomChoice(dummyLanguageList),
      category: randomChoice(DUMMY_CATEGORY_LIST),
      type: randomChoice(dummyTypeList),
      remain: Math.floor(Math.random() * 10) + 1,
      tagList: dummyTagList
    });
  }
  return books;
}
let dummyBookList = createBookList(20);

function findBookById(id: number) {
  return dummyBookList.find((book: Book) => book.id === id);
}

hbs.registerHelper("getBooksWith", function (prop: keyof Book, value) {
  return dummyBookList.filter((book: Book) => _.isEqual(book[prop], value));
});

hbs.registerHelper("isEven", function (n: number): boolean {
  return n % 2 === 0;
});
export default Book;
export { dummyBookList as DUMMY_BOOK_LIST, findBookById };
