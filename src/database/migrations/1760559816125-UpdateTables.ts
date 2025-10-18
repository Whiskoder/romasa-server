import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760559816125 implements MigrationInterface {
    name = 'UpdateTables1760559816125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_716401ac506e0ef68e48fcdfb1" ON "work_order"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "type" varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_716401ac506e0ef68e48fcdfb1" ON "work_order" ("type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_716401ac506e0ef68e48fcdfb1" ON "work_order"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "type" nvarchar(25)`);
        await queryRunner.query(`CREATE INDEX "IDX_716401ac506e0ef68e48fcdfb1" ON "work_order" ("type") `);
    }

}
