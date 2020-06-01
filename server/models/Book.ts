import _ from "lodash";
import hbs from "hbs";



interface Book {
    [title: string]: string;
    cover: string;
    author: string;
    language: string;
    tag: string;
    type: string;
}

interface Books {
    books: Book[];
    titles: string[];
    languages: string[];
    tags: string[];
    types: string[];
    authors: string[];
}

<<<<<<< HEAD
=======


>>>>>>> temp commit
const titles = [
    "A book with a really long title, over five words long",
    "A book with a medium length title",
    "A short book",
];

const languages = [
    "English",
    "Tieng Viet",
];

const tags = [
    "Khoa hoc may tinh",
    "Tri tue nhan tao",
    "Do hoa may tinh",
    "Ly thuyet tinh toan",
];

const types = [
    "Sach",
    "Bai bao khoa hoc",
    "Tap chi khoa hoc",
]

const authors = [
    "Remember Forest",
    "Handsome Sea",
    "Bright Treasure",
]
const cover = "/images/lizard-boi-book.jpg";

function random(things: any[]){
    return things[Math.floor(Math.random() * things.length)];
}
function createBookList(n: number){
    const books: Book[] = [];
    for (let i = 0; i < n; i++){
        books.push({
            title: random(titles),
            author: random(authors),
            cover,
            language: random(languages),
            tag: random(tags),
            type: random(types),
        });
    }
    return books
}

const DUMMY_BOOKS: Books = {
    books: createBookList(50),
    authors,
    titles,
    languages,
    tags,
    types,
}
<<<<<<< HEAD
=======

hbs.registerHelper('getBooksWith', function (prop: string, value, books = DUMMY_BOOKS.books) {
    console.log('cool');
    // return books.filter((book: Book) => book[prop] === value);
    return DUMMY_BOOKS.books;
});
>>>>>>> temp commit

export default Book;
export { DUMMY_BOOKS };