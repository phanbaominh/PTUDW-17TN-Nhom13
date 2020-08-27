import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddIsTeacherColumnToUsersTable1598543443276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "is_teacher",
        type: "boolean",
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "is_teacher");
  }
}
