import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNewsTable1596962755394 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "news",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "category",
            type: "text",
          },
          {
            name: "slug",
            type: "text",
          },
          {
            name: "link",
            type: "text",
          },
          {
            name: "title",
            type: "text",
          },
          {
            name: "content",
            type: "text",
          },
          {
            name: "preview",
            type: "text",
          },
          {
            name: "date",
            type: "date",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("news", true);
  }
}
