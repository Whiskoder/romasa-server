import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760547177881 implements MigrationInterface {
    name = 'UpdateTables1760547177881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic_entity" DROP CONSTRAINT "FK_68baf4088a1def5994fad729c01"`);
        await queryRunner.query(`ALTER TABLE "work_order_service_entity" DROP CONSTRAINT "FK_f46b22805297a408bdef267436b"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic_entity" DROP COLUMN "workOrderEntityId"`);
        await queryRunner.query(`ALTER TABLE "work_order_service_entity" DROP COLUMN "workOrderEntityId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_service_entity" ADD "workOrderEntityId" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic_entity" ADD "workOrderEntityId" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order_service_entity" ADD CONSTRAINT "FK_f46b22805297a408bdef267436b" FOREIGN KEY ("workOrderEntityId") REFERENCES "work_order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic_entity" ADD CONSTRAINT "FK_68baf4088a1def5994fad729c01" FOREIGN KEY ("workOrderEntityId") REFERENCES "work_order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
