import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBookRequestsTable1598546754363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "book_requests",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "username",
            type: "varchar(20)",
          },
          {
            name: "book_title",
            type: "varchar",
          },
          {
            name: "book_author",
            type: "varchar",
          },
          {
            name: "note_request",
            type: "varchar",
          },
          {
            name: "is_done",
            type: "boolean",
            default: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("book_requests", true);
  }
}
