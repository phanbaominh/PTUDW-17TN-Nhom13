import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";
import { BorrowStatus } from "../entities/BorrowCard";

export class CreateBorrowTable1596247432824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'borrow_cards',
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
                        name: 'status',
                        type: 'enum',
                        enum: Object.values(BorrowStatus),
                    },
                    {
                        name: 'created_at',
                        type: 'date',
                    },
                    {
                        name: 'scheduled_at',
                        type: 'date',
                        isNullable: true,
                    },
                    {
                        name: 'borrowed_at',
                        type: 'date',
                        isNullable: true,
                    },
                ],
            }),
            true,
        );
        const createFK = async (columnName, tableName, ref) => {
            await queryRunner.createForeignKey("borrow_cards", new TableForeignKey({
                columnNames: [`${columnName}`],
                referencedColumnNames: [ref],
                referencedTableName: `${tableName}`,
                onDelete: "SET NULL"
            }));
        }

        await createFK('book_id', 'books', 'id');
        await createFK('username', 'users', 'username');

        await queryRunner.createIndex("borrow_cards", new TableIndex({
            name: "IDX_BORROW_BOOK_ID",
            columnNames: ["book_id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("borrow_cards", true);
    }

}
