import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760554317775 implements MigrationInterface {
    name = 'UpdateTables1760554317775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order" ADD "diagnosticId" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "serviceId" uniqueidentifier`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_3ee0e75b16162b86171ac0bd02" ON "work_order" ("diagnosticId") WHERE "diagnosticId" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_6a629a2e109d672b748a9faf29" ON "work_order" ("serviceId") WHERE "serviceId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_3ee0e75b16162b86171ac0bd027" FOREIGN KEY ("diagnosticId") REFERENCES "work_order_diagnostic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_6a629a2e109d672b748a9faf296" FOREIGN KEY ("serviceId") REFERENCES "work_order_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_6a629a2e109d672b748a9faf296"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_3ee0e75b16162b86171ac0bd027"`);
        await queryRunner.query(`DROP INDEX "REL_6a629a2e109d672b748a9faf29" ON "work_order"`);
        await queryRunner.query(`DROP INDEX "REL_3ee0e75b16162b86171ac0bd02" ON "work_order"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "serviceId"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "diagnosticId"`);
    }

}
