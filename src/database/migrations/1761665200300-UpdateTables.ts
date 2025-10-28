import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1761665200300 implements MigrationInterface {
    name = 'UpdateTables1761665200300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "BD_TALLER.dbo.group.woDiagnosticMininumApprovalsRequired", "woDiagnosticMinimumApprovalsRequired"`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "DF_8607a8f2732a3a5fcbe547ad9fd"`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "DF_f65c991e62252b583309ad3f35e" DEFAULT 1 FOR "woDiagnosticMinimumApprovalsRequired"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "minimumApprovalsRequired" int NOT NULL CONSTRAINT "DF_237eee5054e2e2635cb057a76fb" DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "minimumApprovalsRequired" int NOT NULL CONSTRAINT "DF_566520a4ceb0e0ceeab9b2059f2" DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP CONSTRAINT "DF_566520a4ceb0e0ceeab9b2059f2"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "minimumApprovalsRequired"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP CONSTRAINT "DF_237eee5054e2e2635cb057a76fb"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "minimumApprovalsRequired"`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "DF_f65c991e62252b583309ad3f35e"`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "DF_8607a8f2732a3a5fcbe547ad9fd" DEFAULT 1 FOR "woDiagnosticMinimumApprovalsRequired"`);
        await queryRunner.query(`EXEC sp_rename "BD_TALLER.dbo.group.woDiagnosticMinimumApprovalsRequired", "woDiagnosticMininumApprovalsRequired"`);
    }

}
