import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTagTable1595424735879 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tags',
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
        await queryRunner.dropTable("tags", true);
    }

}
