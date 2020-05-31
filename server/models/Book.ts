import _ from "lodash";

interface Book {
    title: string;
    cover: string;
    author: string;
}
function createBookList(n: number, book: Book){
    const books: Book[] = [];
    for (let i = 0; i < n; i++){
        books.push(_.clone(book));
    }
    return books
}
const DUMMY_BOOK: Book = {
    title: "Python Data Science Handbook",
    author: "Jake Vanderpas",
    cover: "/images/lizard-boi-book.jpg",
}
const DUMMY_BOOKS: Book[] = createBookList(50, DUMMY_BOOK); 

export default Book;
export { DUMMY_BOOKS };