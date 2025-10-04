import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateServiceOperationsTable1759363620609
  implements MigrationInterface
{
  name = 'UpdateServiceOperationsTable1759363620609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service_operations" ALTER COLUMN "createdByEmployeeId" int`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ALTER COLUMN "departmentManagerEmployeeId" int`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ALTER COLUMN "vehicleDriverEmployeeId" int`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_f0bde98434ab631af91005539e2" FOREIGN KEY ("createdByEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_23b236f1a336509c87863ed0c49" FOREIGN KEY ("departmentManagerEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_d093ecef300b191a892e89aa82b" FOREIGN KEY ("vehicleDriverEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_d093ecef300b191a892e89aa82b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_23b236f1a336509c87863ed0c49"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_f0bde98434ab631af91005539e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ALTER COLUMN "vehicleDriverEmployeeId" int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ALTER COLUMN "departmentManagerEmployeeId" int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ALTER COLUMN "createdByEmployeeId" int NOT NULL`,
    );
  }
}
