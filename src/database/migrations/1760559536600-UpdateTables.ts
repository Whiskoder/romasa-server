import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760559536600 implements MigrationInterface {
    name = 'UpdateTables1760559536600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_3ee0e75b16162b86171ac0bd027"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_6a629a2e109d672b748a9faf296"`);
        await queryRunner.query(`DROP INDEX "REL_3ee0e75b16162b86171ac0bd02" ON "work_order"`);
        await queryRunner.query(`DROP INDEX "REL_6a629a2e109d672b748a9faf29" ON "work_order"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "diagnosticId"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "serviceId"`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "fuelLevelAtReception" int`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "mileageAtReception" int`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "receivedInventoryItems" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "roofObservations" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "frontObservations" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "leftSideObservations" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "rightSideObservations" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "rearObservations" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "performedServices" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "installedReplacementParts" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "addedFluids" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "reportedSymptoms" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "impactsOperability" bit`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "issueFrequency" nvarchar(25)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "technicalDescription" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "affectedSystems" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "requiredMaterials" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "reportedByDriverId" int NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_716401ac506e0ef68e48fcdfb1" ON "work_order" ("type") `);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_2e21e54777087c3a23f2941ed7d" FOREIGN KEY ("reportedByDriverId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_2e21e54777087c3a23f2941ed7d"`);
        await queryRunner.query(`DROP INDEX "IDX_716401ac506e0ef68e48fcdfb1" ON "work_order"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "reportedByDriverId"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "requiredMaterials"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "affectedSystems"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "technicalDescription"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "issueFrequency"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "impactsOperability"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "reportedSymptoms"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "addedFluids"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "installedReplacementParts"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "performedServices"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "rearObservations"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "rightSideObservations"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "leftSideObservations"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "frontObservations"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "roofObservations"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "receivedInventoryItems"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "mileageAtReception"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "fuelLevelAtReception"`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "serviceId" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "diagnosticId" uniqueidentifier`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_6a629a2e109d672b748a9faf29" ON "work_order" ("serviceId") WHERE ([serviceId] IS NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_3ee0e75b16162b86171ac0bd02" ON "work_order" ("diagnosticId") WHERE ([diagnosticId] IS NOT NULL)`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_6a629a2e109d672b748a9faf296" FOREIGN KEY ("serviceId") REFERENCES "work_order_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_3ee0e75b16162b86171ac0bd027" FOREIGN KEY ("diagnosticId") REFERENCES "work_order_diagnostic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
