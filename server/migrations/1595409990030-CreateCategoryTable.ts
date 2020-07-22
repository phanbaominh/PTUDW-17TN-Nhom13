import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategoryTable1595409990030 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'categories',
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
                    {
                        name: 'desc',
                        type: 'varchar',
                    },
                    {
                        name: 'image',
                        type: 'text',
                    }
                ],
            }),
            true,
        )
    }
        
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories", true);
    }
        
}
    