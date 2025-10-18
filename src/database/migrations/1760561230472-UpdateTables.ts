import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760561230472 implements MigrationInterface {
    name = 'UpdateTables1760561230472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP CONSTRAINT "FK_06e7f918145f0f825a61d8eb162"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP CONSTRAINT "FK_700fcdda771598fa1ad8623b239"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "serviceRequestId"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "serviceRequestId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "serviceRequestId" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "serviceRequestId" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD CONSTRAINT "FK_700fcdda771598fa1ad8623b239" FOREIGN KEY ("serviceRequestId") REFERENCES "service_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD CONSTRAINT "FK_06e7f918145f0f825a61d8eb162" FOREIGN KEY ("serviceRequestId") REFERENCES "service_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
