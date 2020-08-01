import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateBookTable1595425245757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'books',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'desc',
                        type: 'text',
                    },
                    {
                        name: 'cover_image',
                        type: 'text',
                    },
                    {
                        name: 'author',
                        type: 'varchar',
                    },
                    {
                        name: 'page_count',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'publisher',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'publishing_year',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'date',
                    },
                    {
                        name: 'book_count',
                        type: 'int',
                        default: '1',
                    },
                    {
                        name: 'testimonial',
                        type: 'json',
                    },
                    {
                        name: 'language_id',
                        type: 'int',
                    },
                    {
                        name: 'type_id',
                        type: 'int',
                    },
                    {
                        name: 'category_id',
                        type: 'int',
                    }
                ],
            }),
            true,
        )
        const createFK = async (columnName, tableName) => {
            await queryRunner.createForeignKey("books", new TableForeignKey({
                columnNames: [`${columnName}_id`],
                referencedColumnNames: ["id"],
                referencedTableName: `${tableName}`,
                onDelete: "SET NULL"
            }));
        }

        await createFK('language', 'book_languages');
        await createFK('type', 'book_types');
        await createFK('category', 'categories');

        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("books", true);
    }

}
