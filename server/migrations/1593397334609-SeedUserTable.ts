import { MigrationInterface, QueryRunner } from "typeorm";
import { DUMMY_USERS } from "../entities/User";

export class SeedUserTable1593397334609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let user of DUMMY_USERS) {
      await user.save();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (let user of DUMMY_USERS) {
      await user.remove();
    }
  }
}
