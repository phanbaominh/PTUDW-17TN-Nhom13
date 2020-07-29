import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn, ManyToMany, JoinTable, JoinColumn, AfterLoad, OneToMany } from "typeorm";
import { BookLanguage } from "./BookLanguage";
import { BookType } from "./BookType";
import { Category } from "./Category";
import { Tag } from "./Tag";
import EntityHelpers from "./helpers";
import { Comment } from "./Comment";

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
    publishingYear: number;

    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'book_count'})
    bookCount: number;

    @Column()
    testimonial: string;

    @OneToMany(type => Comment, comment => comment.book)
    comments: Comment[];

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

    tagString(): string {
        return this.tags ? this.tags.map(tag => tag.name).join(', ') : '';
    }

    toplevelComments(): Promise<Comment[]>{
        return Comment
            .createQueryBuilder("comment")
            .leftJoin("comment.book", "book")
            .leftJoinAndSelect("comment.user", "user")
            .where("comment.book_id = :id", {id: this.id})
            .andWhere("comment.parent_id IS NULL")
            .getMany();
    }

    static getMany(limit: number): Promise<Book[]>{
        if (limit){
            return Book.createQueryBuilder().limit(limit).getMany();
        }
        return Book.createQueryBuilder().getMany();
    }

    static getAllWithRelations(): Promise<Book[]>{
        return Book
            .createQueryBuilder("book")
            .leftJoinAndSelect("book.category", "cat")
            .leftJoinAndSelect("book.type", "type")
            .leftJoinAndSelect("book.language", "language")
            .leftJoinAndSelect("book.tags", "tags")
            .getMany();
    }
    static getRelatedBooks(book: Book): Promise<Book[]>{
        return Promise.resolve([]);
    }

    static async findOneWithRelations(id: number): Promise<Book> {
        const book = await Book.findOneOrFail(id, {relations: ["category", "type", "language", "tags"]});
        return book;
    };
    static async parseBook(raw: any, oldBook: Book = null): Promise<Book>{
        const book = oldBook ? oldBook : new Book();
        book.title = raw.title;
        book.publisher = raw.publisher;
        book.pageCount = raw.pageCount;
        book.publishingYear = raw.publishingYear;
        book.desc = raw.desc;
        book.createdAt = new Date();
        book.bookCount = raw.bookCount;
        book.author = raw.author;
        book.testimonial = raw.testimonial || '[]';
        book.coverImage = raw.coverImage;
        book.type = await BookType.findOneOrFail(raw.type);
        book.language = await BookLanguage.findOneOrFail(raw.language);
        book.category = await Category.findOneOrFail(raw.category);
        book.tags = await EntityHelpers.findOrCreate(Tag, 'name', raw.tags.split(','));
        return book;
    }
}