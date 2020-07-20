import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entities/User";

export class SeedSuperUser1595255793756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let admin = new User();
    admin.username = "admin";
    admin.password = "admin";
    admin.fullname = "Super User";
    admin.profilePicture = "";
    admin.birthdate = new Date();
    admin.gender = "admin-gender";
    admin.email = "admin@fit.lib.com";
    admin.phone = "0123456789";
    admin.address = "";
    admin.isAdmin = true;

    await admin.save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await User.delete({ username: "admin" });
  }
}
