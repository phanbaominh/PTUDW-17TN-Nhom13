import _ from "lodash";
import hbs from "hbs";
import Chance from "chance";
import Category, { DUMMY_CATEGORIES } from "./Category";

const chance = new Chance();

interface Book {
    [key: string]: any;
    title: string;
    cover: string;
    author: string;
    language: string;
    category: Category;
    type: string;
    desc: string;
    readonly id: number;
    amount: number;
}

interface Books {
    books: Book[];
    languages: string[];
    tags: string[];
    types: string[];
    authors: string[];
}



const titles = [
    "A book with a really long title, over five words long",
    "A book with a medium length title",
    "A short book",
];

const languages = [
    "English",
    "Tiếng Việt",
];

const tags = [
    "Khoa học máy tính",
    "Tri tuệ nhân tạo",
    "Đồ họa máy tính",
    "Lý thuyết tính toán",
];

const types = [
    "Sách",
    "Bài báo khoa học",
    "Tạp chí khoa học",
]

const authors = [
    "Remember Forest",
    "Handsome Sea",
    "Bright Treasure",
]
const cover = "/images/lizard-boi-book.jpg";
let currentId = 0;

function random(things: any[]){
    return things[Math.floor(Math.random() * things.length)];
}

function createBookList(n: number){
    const books: Book[] = [];
    for (let i = 0; i < n; i++){
        books.push({
            id: currentId++,
            title: random(titles),
            desc: chance.paragraph(),
            author: random(authors),
            cover,
            language: random(languages),
            category: random(DUMMY_CATEGORIES),
            type: random(types),
            amount: Math.floor(Math.random() * 10) + 1,
        });
    }
    return books
}

const DUMMY_BOOKS: Books = {
    books: createBookList(50),
    authors,
    languages,
    tags,
    types,
}

function findBookById(id: number){
    return DUMMY_BOOKS.books.find((book: Book) => book.id === id);
}

hbs.registerHelper('getBooksWith', function (prop: string, value) {
    return DUMMY_BOOKS.books.filter((book: Book) => book[prop] === value);
});

export default Book;
export { DUMMY_BOOKS, findBookById };