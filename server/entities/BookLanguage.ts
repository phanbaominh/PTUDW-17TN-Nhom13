import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Book } from "./Book";

@Entity({name: "book_languages"})
export class BookLanguage extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Book, book => book.language)
    books: Book[]
}