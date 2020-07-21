import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1593396878033 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "username",
            type: "char",
            length: "20",
            isPrimary: true
          },
          {
            name: "password",
            type: "char",
            length: "60"
          },
          {
            name: "fullname",
            type: "text"
          },
          {
            name: "profile_picture",
            type: "text"
          },
          {
            name: "birthdate",
            type: "date"
          },
          {
            name: "gender",
            type: "char",
            length: "20"
          },
          {
            name: "email",
            type: "text"
          },
          {
            name: "phone",
            type: "char",
            length: "10"
          },
          {
            name: "address",
            type: "text"
          },
          {
            name: "is_admin",
            type: "bool",
            default: false
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users", true);
  }
}
