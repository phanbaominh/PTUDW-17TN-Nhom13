import { Entity, PrimaryColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt from "bcrypt";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

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

function parseUser(raw: any): User {
  var user = new User();
  user.username = raw.username;
  user.password = raw.password;
  user.fullname = raw.fullname;
  user.profilePicture = raw.profilePicture;
  user.birthdate = raw.birthdate;
  user.gender = raw.gender;
  user.email = raw.email;
  user.phone = raw.phone;
  user.address = raw.address;
  
  return user;
}

const DUMMY_USER1 = parseUser({
  username: "1712092",
  password: "123",
  fullname: "Phan Bảo Minh",
  profilePicture:
    "https://lh3.googleusercontent.com/a-/AOh14Gi0DgItGDTATTFV6lPiVrqtja6RZ_qrY91zg42o-g",
  birthdate: new Date("1999-11-25"),
  gender: "Nam",
  email: "1712092@student.hcmus.edu.vn",
  phone: "0121712092",
  address: "17120/92 NVC"
});

const DUMMY_USER2 = parseUser({
  username: "1712247",
  password: "123",
  fullname: "Hồ Nguyễn Hải Tuấn",
  profilePicture: "/images/user__avatar1.jpg",
  birthdate: new Date("1999-11-08"),
  gender: "Nam",
  email: "1712247@student.hcmus.edu.vn",
  phone: "0121712247",
  address: "17122/47 NVC"
});

const DUMMY_USER3 = parseUser({
  username: "1712932",
  password: "123",
  fullname: "Nguyễn Hy Hoài Lâm",
  profilePicture: "/images/user__avatar2.jpg",
  birthdate: new Date("1999-06-01"),
  gender: "Nam",
  email: "1712932@student.hcmus.edu.vn",
  phone: "0121712932",
  address: "17129/32 NVC"
});

const DUMMY_USERS = [DUMMY_USER1, DUMMY_USER2, DUMMY_USER3];
export { DUMMY_USERS, parseUser };
