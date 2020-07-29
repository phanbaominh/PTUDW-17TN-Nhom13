import { Entity, PrimaryColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import bcrypt from "bcrypt";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Comment } from "./Comment";

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

  strip() {
    this.username = this.username.trim();
    this.password = this.password.trim();
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
