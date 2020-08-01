import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class CreateCommentTable1596006027810 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'comments',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'book_id',
                        type: 'int',
                    },
                    {
                        name: 'username',
                        type: 'varchar(20)'
                    },
                    {
                        name: 'parent_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'content',
                        type: 'text',
                    },
                    {
                        name: 'created_at',
                        type: 'date',
                    },
                ],
            }),
            true,
        );
        const createFK = async (columnName, tableName, ref) => {
            await queryRunner.createForeignKey("comments", new TableForeignKey({
                columnNames: [`${columnName}`],
                referencedColumnNames: [ref],
                referencedTableName: `${tableName}`,
                onDelete: "SET NULL"
            }));
        }

        await createFK('book_id', 'books', 'id');
        await createFK('parent_id', 'comments', 'id');
        await createFK('username', 'users', 'username');

        await queryRunner.createIndex("comments", new TableIndex({
            name: "IDX_COMMENTS_PARENT_ID",
            columnNames: ["parent_id"]
        }));

        await queryRunner.createIndex("comments", new TableIndex({
            name: "IDX_COMMENTS_BOOK_ID",
            columnNames: ["book_id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("comments", true);
    }

}
