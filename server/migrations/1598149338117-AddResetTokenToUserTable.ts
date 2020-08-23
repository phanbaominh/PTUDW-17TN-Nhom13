import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddResetTokenToUserTable1598149338117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "reset_token",
        type: "char(36)",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "reset_token");
  }
}
