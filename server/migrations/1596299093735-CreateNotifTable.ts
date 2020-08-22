import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";
import { NotiType } from "../entities/UserNotification";

export class CreateNotifTable1596299093735 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notifications",
        columns: [
          {
            name: "id",
            isPrimary: true,
            isGenerated: true,
            type: "int",
          },
          {
            name: "content",
            type: "text",
          },
          {
            name: "type",
            type: "enum",
            enum: Object.values(NotiType),
          },
          {
            name: "book_id",
            type: "int",
          },
          {
            name: "username",
            type: "varchar(20)",
          },
        ],
      }),
      true,
    );

    const createFK = async (columnName, tableName, ref) => {
      await queryRunner.createForeignKey(
        "notifications",
        new TableForeignKey({
          columnNames: [`${columnName}`],
          referencedColumnNames: [ref],
          referencedTableName: `${tableName}`,
          onDelete: "SET NULL",
        }),
      );
    };

    await createFK("book_id", "books", "id");
    await createFK("username", "users", "username");

    await queryRunner.createIndex(
      "notifications",
      new TableIndex({
        name: "IDX_NOTIF_USER_USERNAME",
        columnNames: ["username"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notifications", true);
  }
}
