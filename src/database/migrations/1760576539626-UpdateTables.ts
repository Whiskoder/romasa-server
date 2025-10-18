import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760576539626 implements MigrationInterface {
    name = 'UpdateTables1760576539626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "groupId" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_974590e8d8d4ceb64e30c38e051" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_974590e8d8d4ceb64e30c38e051"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "groupId"`);
    }

}
