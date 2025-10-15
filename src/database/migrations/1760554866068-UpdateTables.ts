import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760554866068 implements MigrationInterface {
    name = 'UpdateTables1760554866068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service_request" ("id" uniqueidentifier NOT NULL, "trackingCode" nvarchar(10) NOT NULL, "priority" nvarchar(25) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_479c04f4698be489d89c31682ba" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_9567572536e2a4695ee4fcb33be" DEFAULT getdate(), "createdById" uniqueidentifier NOT NULL, "updatedById" uniqueidentifier NOT NULL, "requesterId" uniqueidentifier NOT NULL, "vehicleId" int NOT NULL, CONSTRAINT "PK_08446fa58294cb2dd0b6ff9e5a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "service_request" ADD CONSTRAINT "FK_323e1d751ad6d23eb0c617d1735" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_request" ADD CONSTRAINT "FK_a56c804d1fa633b5a72199d5d48" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_request" ADD CONSTRAINT "FK_9654b920c8e0ad7f669da424de7" FOREIGN KEY ("requesterId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_request" ADD CONSTRAINT "FK_da4d380645c9b1f85ae3eb53960" FOREIGN KEY ("vehicleId") REFERENCES "TBLTRNVHC_CP"("LNGDNTTRN") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_request" DROP CONSTRAINT "FK_da4d380645c9b1f85ae3eb53960"`);
        await queryRunner.query(`ALTER TABLE "service_request" DROP CONSTRAINT "FK_9654b920c8e0ad7f669da424de7"`);
        await queryRunner.query(`ALTER TABLE "service_request" DROP CONSTRAINT "FK_a56c804d1fa633b5a72199d5d48"`);
        await queryRunner.query(`ALTER TABLE "service_request" DROP CONSTRAINT "FK_323e1d751ad6d23eb0c617d1735"`);
        await queryRunner.query(`DROP TABLE "service_request"`);
    }

}
