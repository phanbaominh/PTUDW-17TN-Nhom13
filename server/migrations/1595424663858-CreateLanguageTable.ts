import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLanguageTable1595424663858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'book_languages',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                ],
            }),
            true,
        )
    }
        
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("book_languages", true);
    }
}
