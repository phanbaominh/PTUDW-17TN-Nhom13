import {Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity({name: "loves"})
export class Love extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Book, (book) => book.loves)
    @JoinColumn({ name: "book_id" })
    book: Book;

    @ManyToOne((type) => User, (user) => user.loves)
    @JoinColumn({ name: "username" })
    user: User;

    static getLoveRef(status: Boolean, bookId: number){
        if (status) 
            return `/books/${bookId}/love?_method=DELETE`;
        else 
            return `/books/${bookId}/love`;
    }

    static getLoveForm(status: Boolean, bookId: number): string {
        let action = Love.getLoveRef(status, bookId);
        let style = status ? "bg-red-500 text-white" : "bg-gray-500 text-gray-200";
        return `
        <form class="delete-form inline-block w-full" action="${action}" method="post">
            <button
                aria-label="Yêu thích"
                class="${style} rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ml-4">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    class="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z">
                    </path>
                </svg>
            </button>
        </form>`;
    }
}