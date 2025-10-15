import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760547395908 implements MigrationInterface {
    name = 'UpdateTables1760547395908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_entity" DROP CONSTRAINT "FK_ced5736c7fe2fa52a344f6d2abb"`);
        await queryRunner.query(`ALTER TABLE "work_order_entity" DROP COLUMN "serviceRequestEntityId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_entity" ADD "serviceRequestEntityId" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order_entity" ADD CONSTRAINT "FK_ced5736c7fe2fa52a344f6d2abb" FOREIGN KEY ("serviceRequestEntityId") REFERENCES "service_request_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
