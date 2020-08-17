import { Entity, PrimaryColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate, OneToMany, Brackets, Like } from "typeorm";
import bcrypt from "bcrypt";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Comment } from "./Comment";
import { BorrowCard, BorrowStatus } from "./BorrowCard";
import { Love } from "./Love";
import UserNotification from "./UserNotification";
import { type } from "jquery";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column({ name: "profile_picture" })
  profilePicture: string;

  @Column()
  birthdate: Date;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ name: "is_admin" })
  isAdmin: boolean;

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(type => BorrowCard, card => card.user)
  borrowCards: BorrowCard[];

  @OneToMany(type => Love, love => love.user)
  loves: Love[];

  @OneToMany(type => UserNotification, noti => noti.user)
  notifications: UserNotification[];

  strip() {
    this.username = this.username.trim();
    this.password = this.password.trim();
  }

  async getBorrowCardForBook(bookId: number): Promise<BorrowCard>{
    return await BorrowCard
      .createQueryBuilder("card")
      .leftJoin("card.book", "book")
      .where(":username = card.username", { username: this.username})
      .andWhere(":bookId = book.id", { bookId })
      .andWhere(":status <> card.status", { status: BorrowStatus.CANCELED })
      .andWhere(":status2 <> card.status", { status2: BorrowStatus.RETURNED })
      .orderBy("card.id", "DESC")
      .getOne();
  }
  async getBookStatus(bookId: number): Promise<BorrowStatus>{
    const card = await this.getBorrowCardForBook(bookId);
    const status = card ? card.status : BorrowStatus.CANCELED;
    return status;
  }

  async getBorrowCards(): Promise<BorrowCard[]>{
    return await BorrowCard
      .createQueryBuilder("card")
      .leftJoinAndSelect("card.book", "book")
      .leftJoinAndSelect("book.borrowCards", "cards")
      .where(":username = card.username", { username: this.username} )
      .andWhere(":status <> card.status", { status: BorrowStatus.CANCELED })
      .getMany();
  }

  async getRAndBCount(): Promise<number> {
    return BorrowCard
    .createQueryBuilder("card")
    .leftJoinAndSelect("card.book", "book")
    .where(":username = card.username", { username: this.username} )
    .andWhere(new Brackets(qb => {
      qb.where(":status = card.status", { status: BorrowStatus.REQUESTED })
        .orWhere(":status2 = card.status", { status2: BorrowStatus.BORROWED })
      })
    )
    .getCount();
  }

  async getLoveForBook(bookId: number): Promise<Love>{
    return await Love
      .createQueryBuilder("love")
      .leftJoinAndSelect("love.book", "book")
      .where(":username = love.username", {username: this.username})
      .andWhere(":bookId = book.id", {bookId})
      .getOne()
  }

  async getLoveStatus(bookId: number): Promise<Boolean> {
    const love = await this.getLoveForBook(bookId);
    const status = love ? true : false;
    return status;
  }

  @BeforeUpdate()
  @BeforeInsert()
  async encryptPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  static parseUser(raw: QueryDeepPartialEntity<User>): User {
    var user = new User();
    user.username = raw.username as string;
    user.password = raw.password as string;
    user.fullname = raw.fullname as string;
    user.profilePicture = raw.profilePicture as string;
    user.birthdate = raw.birthdate as Date;
    user.gender = raw.gender as string;
    user.email = raw.email as string;
    user.phone = raw.phone as string;
    user.address = raw.address as string;
    user.isAdmin = raw.isAdmin as boolean; 
    return user;
  }
}