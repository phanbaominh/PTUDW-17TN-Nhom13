import { Seeder, Factory } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "../entities/User";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

const DUMMY_USER1 = {
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
};

const DUMMY_USER2 = {
  username: "1712247",
  password: "123",
  fullname: "Hồ Nguyễn Hải Tuấn",
  profilePicture: "/images/user__avatar1.jpg",
  birthdate: new Date("1999-11-08"),
  gender: "Nam",
  email: "1712247@student.hcmus.edu.vn",
  phone: "0121712247",
  address: "17122/47 NVC"
};

const DUMMY_USER3 = {
  username: "1712932",
  password: "123",
  fullname: "Nguyễn Hy Hoài Lâm",
  profilePicture: "/images/user__avatar2.jpg",
  birthdate: new Date("1999-06-01"),
  gender: "Nam",
  email: "1712932@student.hcmus.edu.vn",
  phone: "0121712932",
  address: "17129/32 NVC"
};

const ADMIN_USER = {
  username: "admin",
  password: "admin",
  fullname: "Super User",
  profilePicture: "",
  birthdate: new Date(),
  gender: "admin-gender",
  email: "admin@fit.lib.com",
  phone: "0123456789",
  address: "",
  isAdmin: true,
}
const DUMMY_USERS: Array<QueryDeepPartialEntity<User>> = [DUMMY_USER1, DUMMY_USER2, DUMMY_USER3, ADMIN_USER];

class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // To trigger entity hooks
    await Promise.allSettled(DUMMY_USERS.map((user) => User.parseUser(user).save()));
  }
}
module.exports = {
  CreateUsers,
}