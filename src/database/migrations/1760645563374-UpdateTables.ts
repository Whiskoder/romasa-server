import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760645563374 implements MigrationInterface {
    name = 'UpdateTables1760645563374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_1c41e667aaf2b2114c5c98b89cd"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_1c41e667aaf2b2114c5c98b89cd" DEFAULT 0 FOR "isSuperAdmin"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_1c41e667aaf2b2114c5c98b89cd"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_1c41e667aaf2b2114c5c98b89cd" DEFAULT 1 FOR "isSuperAdmin"`);
    }

}
