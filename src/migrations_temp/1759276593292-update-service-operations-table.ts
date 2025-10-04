import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateServiceOperationsTable1759276593292 implements MigrationInterface {
    name = 'UpdateServiceOperationsTable1759276593292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_operations" DROP CONSTRAINT "DF_8c5cdd9b04ab91846a4f3eb60c8"`);
        await queryRunner.query(`ALTER TABLE "service_operations" ADD CONSTRAINT "DF_8c5cdd9b04ab91846a4f3eb60c8" DEFAULT 'requested' FOR "status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_operations" DROP CONSTRAINT "DF_8c5cdd9b04ab91846a4f3eb60c8"`);
        await queryRunner.query(`ALTER TABLE "service_operations" ADD CONSTRAINT "DF_8c5cdd9b04ab91846a4f3eb60c8" DEFAULT 'created' FOR "status"`);
    }

}
