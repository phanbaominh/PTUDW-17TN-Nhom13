import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTaggings1595426370942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "taggings",
        columns: [
          {
            name: "book_id",
            type: "int",
          },
          {
            name: "tag_id",
            type: "int",
          },
        ],
      }),
      true,
    );
    const createFK = async (columnName, tableName) => {
      await queryRunner.createForeignKey(
        "taggings",
        new TableForeignKey({
          columnNames: [`${columnName}_id`],
          referencedColumnNames: ["id"],
          referencedTableName: `${tableName}`,
          onDelete: "SET NULL",
        }),
      );
    };
    await createFK("book", "books");
    await createFK("tag", "tags");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("books", true);
  }
}
