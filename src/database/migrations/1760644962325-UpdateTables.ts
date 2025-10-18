import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760644962325 implements MigrationInterface {
    name = 'UpdateTables1760644962325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isSuperAdmin" bit NOT NULL CONSTRAINT "DF_1c41e667aaf2b2114c5c98b89cd" DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_1c41e667aaf2b2114c5c98b89cd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isSuperAdmin"`);
    }

}
