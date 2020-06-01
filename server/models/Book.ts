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

hbs.registerHelper('getBooksWith', function (prop: string, value) {
    return DUMMY_BOOKS.books.filter((book: Book) => book[prop] === value);
});

export default Book;
export { DUMMY_BOOKS };