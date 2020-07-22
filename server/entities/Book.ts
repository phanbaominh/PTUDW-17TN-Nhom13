import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn, ManyToMany, JoinTable, JoinColumn, AfterLoad } from "typeorm";
import { BookLanguage } from "./BookLanguage";
import { BookType } from "./BookType";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity({name: "books"})
export class Book extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    desc: string;

    @Column({name: 'cover_image'})
    coverImage: string;

    @Column()
    author: string;

    @Column({name: 'page_count'})
    pageCount: number;

    @Column()
    publisher: string;

    @Column({name: 'publishing_year'})
    publishingYear: Date;

    @Column({name: 'date_added'})
    dateAdded: Date;

    @Column({name: 'book_count'})
    bookCount: number;

    @Column()
    testimonial: string;

    @ManyToOne(type => BookLanguage, language => language.books)
    @JoinColumn({name: 'language_id'})
    language: BookLanguage;

    @ManyToOne(type => BookType, type => type.books)
    @JoinColumn({name: 'type_id'})
    type: BookType;

    @ManyToOne(type => Category, category => category.books)
    @JoinColumn({name: 'category_id'})
    category: Category;

    @ManyToMany(type => Tag, tag => tag.books)
    @JoinTable({
        name: 'taggings', 
        joinColumn: { name: 'book_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
    })
    tags: Tag[];

    static getMany(limit: number): Promise<Book[]>{
        if (limit){
            return Book.createQueryBuilder().limit(limit).getMany();
        }
        return Book.createQueryBuilder().getMany();
    }

    static getRelatedBooks(book: Book): Promise<Book[]>{
        return Promise.resolve([]);
    }
}