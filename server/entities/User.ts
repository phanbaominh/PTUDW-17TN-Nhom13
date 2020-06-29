import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

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

  checkPassword(passwordToCheck: string) {
    console.log("checking", passwordToCheck);
    return this.password === passwordToCheck;
  }

  strip() {
    this.username = this.username.trim();
    this.password = this.password.trim();
  }
}

function parseUser(raw: any): User {
  var user = new User();
  user.username = raw.username;
  user.password = raw.password;
  user.fullname = raw.fullname;
  user.profilePicture = raw.profilePicture;
  return user;
}

const DUMMY_USER1 = parseUser({
  username: "1712092",
  password: "123",
  fullname: "Phan Bảo Minh",
  profilePicture:
    "https://lh3.googleusercontent.com/a-/AOh14Gi0DgItGDTATTFV6lPiVrqtja6RZ_qrY91zg42o-g"
});

const DUMMY_USER2 = parseUser({
  username: "1712247",
  password: "123",
  fullname: "Hồ Nguyễn Hải Tuấn",
  profilePicture: "/images/user__avatar1.jpg"
});

const DUMMY_USER3 = parseUser({
  username: "1712932",
  password: "123",
  fullname: "Nguyễn Hy Hoài Lâm",
  profilePicture: "/images/user__avatar2.jpg"
});

const DUMMY_USERS = [DUMMY_USER1, DUMMY_USER2, DUMMY_USER3];
export { DUMMY_USERS };
