import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateServiceOperationsTable1759265883846 implements MigrationInterface {
    name = 'CreateServiceOperationsTable1759265883846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service_operations" ("id" int NOT NULL IDENTITY(1,1), "affectsOperability" bit NOT NULL CONSTRAINT "DF_35f642d2e03125692d4f5e66019" DEFAULT 0, "branch" varchar(20) NOT NULL, "createdAt" datetime NOT NULL, "createdByEmployeeId" int NOT NULL, "estimatedDeliveryDate" datetime, "departmentManagerEmployeeId" int NOT NULL, "folio" varchar(10) NOT NULL, "priority" varchar(10) NOT NULL CONSTRAINT "DF_e5d638c9f3ffa11650683699ac7" DEFAULT 'low', "status" varchar(20) NOT NULL CONSTRAINT "DF_8c5cdd9b04ab91846a4f3eb60c8" DEFAULT 'created', "updatedAt" datetime NOT NULL, "vehicleDriverEmployeeId" int NOT NULL, "vehicleFailure" nvarchar(1000) NOT NULL, "vehicleFuelLevel" int NOT NULL, "vehicleId" int NOT NULL, "vehicleInventory" nvarchar(MAX), "vehicleMileage" int NOT NULL, CONSTRAINT "PK_05fb0abbff9b30d3a1a1b0863d1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "service_operations"`);
    }

}
