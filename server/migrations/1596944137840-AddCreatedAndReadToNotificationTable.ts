import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCreatedAndReadToNotificationTable1596944137840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("notifications", [
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "NOW()",
      }),
      new TableColumn({
        name: "read",
        type: "boolean",
        default: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("notifications", "created_at");
    await queryRunner.dropColumn("notifications", "read");
  }
}
