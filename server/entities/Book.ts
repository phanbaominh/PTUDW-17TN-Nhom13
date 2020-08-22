import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
  BeforeUpdate,
  BeforeInsert,
  AfterLoad,
  In,
} from "typeorm";
import { BookLanguage } from "./BookLanguage";
import { BookType } from "./BookType";
import { Category } from "./Category";
import { Tag } from "./Tag";
import EntityHelpers from "./helpers";
import { Comment } from "./Comment";
import { BorrowCard, BorrowStatus } from "./BorrowCard";
import { Love } from "./Love";
import UserNotification from "./UserNotification";

@Entity({ name: "books" })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ name: "cover_image" })
  coverImage: string;

  @Column()
  author: string;

  @Column({ name: "page_count" })
  pageCount: number;

  @Column()
  publisher: string;

  @Column({ name: "publishing_year" })
  publishingYear: number;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "book_count" })
  bookCount: number;

  @Column()
  testimonial: string;

  @OneToMany((type) => Comment, (comment) => comment.book)
  comments: Comment[];

  @ManyToOne((type) => BookLanguage, (language) => language.books)
  @JoinColumn({ name: "language_id" })
  language: BookLanguage;

  @ManyToOne((type) => BookType, (type) => type.books)
  @JoinColumn({ name: "type_id" })
  type: BookType;

  @OneToMany((type) => BorrowCard, (card) => card.book)
  borrowCards: BorrowCard[];

  @OneToMany((type) => Love, (love) => love.book)
  loves: Love[];

  @OneToMany((type) => UserNotification, (noti) => noti.book)
  notifications: Notification[];

  @ManyToOne((type) => Category, (category) => category.books)
  @JoinColumn({ name: "category_id" })
  category: Category;

  borrowCount = 0;

  @ManyToMany((type) => Tag, (tag) => tag.books)
  @JoinTable({
    name: "taggings",
    joinColumn: { name: "book_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tag_id", referencedColumnName: "id" },
  })
  tags: Tag[];
  position: string;
  currentCard: BorrowCard;
  currentBookCount: number;

  tagString(): string {
    return this.tags ? this.tags.map((tag) => tag.name).join(", ") : "";
  }

  toplevelComments(): Promise<Comment[]> {
    return Comment.createQueryBuilder("comment")
      .leftJoin("comment.book", "book")
      .leftJoinAndSelect("comment.user", "user")
      .where("comment.book_id = :id", { id: this.id })
      .andWhere("comment.parent_id IS NULL")
      .getMany();
  }

  @BeforeUpdate()
  @BeforeInsert()
  stringifyTestimonial() {
    if (typeof this.testimonial !== "string") {
      this.testimonial = JSON.stringify(this.testimonial);
    }
  }

  @AfterLoad()
  setPosition() {
    if (this.category) {
      let idString = (this.id % 1000).toString();
      while (idString.length < 3) idString = "0" + idString;
      this.position = `${this.category.position}-${idString}`;
    }
  }

  @AfterLoad()
  setCurrentCount() {
    if (this.borrowCards) {
      const borrowedCount = this.borrowCards.filter((card) =>
        BorrowCard.isTakeBook(card.status)
      ).length;
      this.currentBookCount = this.bookCount - borrowedCount;
    }
  }

  async getCurrentCount() {
    let takenBookCount = await BorrowCard.count({
      where: {
        book: this,
        status: In([BorrowStatus.REQUESTED, BorrowStatus.BORROWED]),
      },
    });
    return this.bookCount - takenBookCount;
  }

  static getMany(limit: number): Promise<Book[]> {
    if (limit) {
      return Book.createQueryBuilder().limit(limit).getMany();
    }
    return Book.createQueryBuilder().getMany();
  }

  static getAllWithRelations(): Promise<Book[]> {
    return Book.createQueryBuilder("book")
      .leftJoinAndSelect("book.category", "cat")
      .leftJoinAndSelect("book.type", "type")
      .leftJoinAndSelect("book.language", "language")
      .leftJoinAndSelect("book.tags", "tags")
      .getMany();
  }
  static getRelatedBooks(book: Book): Promise<Book[]> {
    return Promise.resolve([]);
  }

  static async findOneWithRelations(id: number): Promise<Book> {
    const book = await Book.findOneOrFail(id, {
      relations: ["category", "type", "language", "tags", "borrowCards"],
    });
    return book;
  }
  static async parseBook(raw: any, oldBook: Book = null): Promise<Book> {
    const book = oldBook ? oldBook : new Book();
    book.title = raw.title;
    book.publisher = raw.publisher;
    book.pageCount = raw.pageCount;
    book.publishingYear = raw.publishingYear;
    book.desc = raw.desc;
    book.createdAt = new Date();
    book.bookCount = raw.bookCount;
    book.author = raw.author;
    book.testimonial = raw.testimonial || "[]";
    book.coverImage = raw.coverImage;
    book.type = await BookType.findOneOrFail(raw.type);
    book.language = await BookLanguage.findOneOrFail(raw.language);
    book.category = await Category.findOneOrFail(raw.category);
    book.tags = await EntityHelpers.findOrCreate(
      Tag,
      "name",
      raw.tags.split(",")
    );
    return book;
  }
}
