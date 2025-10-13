import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncDatabase1760381661863 implements MigrationInterface {
    name = 'SyncDatabase1760381661863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workshop" ("id" uniqueidentifier NOT NULL, "name" nvarchar(255) NOT NULL, "capacity" int NOT NULL, CONSTRAINT "PK_e755b83ccf7c711f998012e1c92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" uniqueidentifier NOT NULL, "name" nvarchar(255) NOT NULL, "type" nvarchar(25) NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_659d1483316afb28afd3a90646e" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(100) NOT NULL, "isActive" bit NOT NULL CONSTRAINT "DF_ecc60599022046f6f07d6787907" DEFAULT 1, "permissions" text, "createdAt" datetime NOT NULL CONSTRAINT "DF_382670d3cb57dca9ac949ff45ba" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_3019ca2543b8694598acd262ff6" DEFAULT getdate(), CONSTRAINT "UQ_664ea405ae2a10c264d582ee563" UNIQUE ("name"), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_request" ("id" uniqueidentifier NOT NULL, "trackingCode" nvarchar(10) NOT NULL, "priority" nvarchar(25) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_479c04f4698be489d89c31682ba" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_9567572536e2a4695ee4fcb33be" DEFAULT getdate(), "createdById" uniqueidentifier NOT NULL, "updatedById" uniqueidentifier NOT NULL, "requesterId" uniqueidentifier NOT NULL, "vehicleId" int NOT NULL, CONSTRAINT "PK_08446fa58294cb2dd0b6ff9e5a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_order" ("id" uniqueidentifier NOT NULL, "scheduledDate" datetime, "estimatedDuration" datetime, "actualDuration" datetime, "vehicleInWorkshop" bit, "requiresApproval" bit NOT NULL CONSTRAINT "DF_6e309ccc9cf4db566abc94430b8" DEFAULT 1, "approvalDate" datetime, "status" nvarchar(25) NOT NULL, "serviceRequestId" uniqueidentifier NOT NULL, "workshopId" uniqueidentifier NOT NULL, "scheduledById" uniqueidentifier, "supervisorId" int, "assignedEmployeeId" int, CONSTRAINT "PK_0730e63dd523d397530859cb6d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_order_diagnostic" ("id" uniqueidentifier NOT NULL, "reportedSymptoms" nvarchar(255) NOT NULL, "impactsOperability" bit NOT NULL, "issueFrequency" nvarchar(25) NOT NULL, "technicalDescription" nvarchar(255), "affectedSystems" nvarchar(255), "requiredMaterials" nvarchar(255), "workOrderId" uniqueidentifier NOT NULL, "reportedByDriverId" int NOT NULL, CONSTRAINT "PK_c03c81cfc9adeb4a5fb6351fa99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_order_service" ("id" uniqueidentifier NOT NULL, "fuelLevelAtReception" int NOT NULL, "mileageAtReception" int NOT NULL, "receivedInventoryItems" nvarchar(255), "roofObservations" nvarchar(255), "frontObservations" nvarchar(255), "leftSideObservations" nvarchar(255), "rightSideObservations" nvarchar(255), "rearObservations" nvarchar(255), "performedServices" nvarchar(255), "installedReplacementParts" nvarchar(255), "addedFluids" nvarchar(255), "workOrderId" uniqueidentifier NOT NULL, CONSTRAINT "PK_f1d2c3ac58db328d26068b8267d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "groupId" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1d770f014b76f7cfb58089dafc" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_request" ADD CONSTRAINT "FK_323e1d751ad6d23eb0c617d1735" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_request" ADD CONSTRAINT "FK_a56c804d1fa633b5a72199d5d48" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_request" ADD CONSTRAINT "FK_9654b920c8e0ad7f669da424de7" FOREIGN KEY ("requesterId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_request" ADD CONSTRAINT "FK_da4d380645c9b1f85ae3eb53960" FOREIGN KEY ("vehicleId") REFERENCES "TBLTRNVHC_CP"("LNGDNTTRN") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_5467965dcbb6f4090d0c9bd5885" FOREIGN KEY ("serviceRequestId") REFERENCES "service_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_ee413bb613b090c056af0a38828" FOREIGN KEY ("workshopId") REFERENCES "workshop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_365e7a0afd13a4496b278ea7d2a" FOREIGN KEY ("scheduledById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_2bc2301df5597a6779352988b6e" FOREIGN KEY ("supervisorId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_cd0167d4f048758199744e2ac3a" FOREIGN KEY ("assignedEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD CONSTRAINT "FK_f03ae8ffb9adf57c0d46e3caace" FOREIGN KEY ("workOrderId") REFERENCES "work_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD CONSTRAINT "FK_93f970533c1c0cd6cb757bc23ab" FOREIGN KEY ("reportedByDriverId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD CONSTRAINT "FK_38a26c18ee878cc140e52455f49" FOREIGN KEY ("workOrderId") REFERENCES "work_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP CONSTRAINT "FK_38a26c18ee878cc140e52455f49"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP CONSTRAINT "FK_93f970533c1c0cd6cb757bc23ab"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP CONSTRAINT "FK_f03ae8ffb9adf57c0d46e3caace"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_cd0167d4f048758199744e2ac3a"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_2bc2301df5597a6779352988b6e"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_365e7a0afd13a4496b278ea7d2a"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_ee413bb613b090c056af0a38828"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_5467965dcbb6f4090d0c9bd5885"`);
        await queryRunner.query(`ALTER TABLE "service_request" DROP CONSTRAINT "FK_da4d380645c9b1f85ae3eb53960"`);
        await queryRunner.query(`ALTER TABLE "service_request" DROP CONSTRAINT "FK_9654b920c8e0ad7f669da424de7"`);
        await queryRunner.query(`ALTER TABLE "service_request" DROP CONSTRAINT "FK_a56c804d1fa633b5a72199d5d48"`);
        await queryRunner.query(`ALTER TABLE "service_request" DROP CONSTRAINT "FK_323e1d751ad6d23eb0c617d1735"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1d770f014b76f7cfb58089dafc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "groupId"`);
        await queryRunner.query(`DROP TABLE "work_order_service"`);
        await queryRunner.query(`DROP TABLE "work_order_diagnostic"`);
        await queryRunner.query(`DROP TABLE "work_order"`);
        await queryRunner.query(`DROP TABLE "service_request"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "workshop"`);
    }

}
