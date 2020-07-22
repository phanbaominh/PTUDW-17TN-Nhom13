import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Book } from "./Book";

@Entity({name: "book_types"})
export class BookType extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Book, book => book.type)
    books: Book[];
}