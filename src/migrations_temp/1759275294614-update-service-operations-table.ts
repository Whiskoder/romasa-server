import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateServiceOperationsTable1759275294614 implements MigrationInterface {
    name = 'UpdateServiceOperationsTable1759275294614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_operations" ADD CONSTRAINT "DF_0fbadd666631c7fe6d78de2040b" DEFAULT getdate() FOR "createdAt"`);
        await queryRunner.query(`ALTER TABLE "service_operations" ALTER COLUMN "updatedAt" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service_operations" ADD CONSTRAINT "DF_4847aba1fc75ace03f5b573ece0" DEFAULT getdate() FOR "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_operations" DROP CONSTRAINT "DF_4847aba1fc75ace03f5b573ece0"`);
        await queryRunner.query(`ALTER TABLE "service_operations" ALTER COLUMN "updatedAt" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service_operations" DROP CONSTRAINT "DF_0fbadd666631c7fe6d78de2040b"`);
    }

}
