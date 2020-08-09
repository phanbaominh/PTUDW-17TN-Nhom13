import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPositionToCategoryTable1596901238880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "categories",
      new TableColumn({
        name: "position",
        type: "int",
        default: 0,
      }),
    );
    await queryRunner.query("UPDATE categories SET position = id");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("categories", "position");
  }
}
