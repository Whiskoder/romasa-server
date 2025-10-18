import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760556248969 implements MigrationInterface {
    name = 'UpdateTables1760556248969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order" ADD "serviceRequestId" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_5467965dcbb6f4090d0c9bd5885" FOREIGN KEY ("serviceRequestId") REFERENCES "service_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_5467965dcbb6f4090d0c9bd5885"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "serviceRequestId"`);
    }

}
