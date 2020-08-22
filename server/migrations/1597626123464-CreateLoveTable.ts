import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateLoveTable1597626123464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "loves",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
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
      true
    );
    const createFK = async (columnName, tableName, ref) => {
      await queryRunner.createForeignKey(
        "loves",
        new TableForeignKey({
          columnNames: [`${columnName}`],
          referencedColumnNames: [ref],
          referencedTableName: `${tableName}`,
          onDelete: "SET NULL",
        })
      );
    };

    await createFK("book_id", "books", "id");
    await createFK("username", "users", "username");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("loves", true);
  }
}
