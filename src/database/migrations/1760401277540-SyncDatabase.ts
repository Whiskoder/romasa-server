import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncDatabase1760401277540 implements MigrationInterface {
    name = 'SyncDatabase1760401277540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workshop_entity" ("id" uniqueidentifier NOT NULL, "name" nvarchar(255) NOT NULL, "capacity" int NOT NULL, CONSTRAINT "PK_4f57ba91f6201044b664cd4a9c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uniqueidentifier NOT NULL, "hashedPassword" nvarchar(60), "email" nvarchar(255) NOT NULL, "isActive" bit NOT NULL CONSTRAINT "DF_d8964a43ebb5c941c14a229adb8" DEFAULT 1, "encryptedTokenSecret" varbinary(255) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_73d93da5d7e1af5e2171d9f4543" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_47a12bfe17e970e3f22fc3e4c01" DEFAULT getdate(), "employeeEntityId" int, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_entity" ("id" uniqueidentifier NOT NULL, "name" nvarchar(100) NOT NULL, "isActive" bit NOT NULL CONSTRAINT "DF_41769e0df2b1bd41390a1408207" DEFAULT 1, "permissions" text, "createdAt" datetime NOT NULL CONSTRAINT "DF_0ac89536afc26882dfa84e1f330" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b14426b7e3c43d92c072e890f75" DEFAULT getdate(), CONSTRAINT "UQ_0bd21227754816190ee2ea0fb20" UNIQUE ("name"), CONSTRAINT "PK_d074114199e1996b57b04ac77ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_entity" ("id" uniqueidentifier NOT NULL, "name" nvarchar(255) NOT NULL, "type" nvarchar(25) NOT NULL, CONSTRAINT "PK_8898b6830f057f3f5c239796fa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_request_entity" ("id" uniqueidentifier NOT NULL, "trackingCode" nvarchar(10) NOT NULL, "priority" nvarchar(25) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_2ea637e0d1638e627ca2349013d" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_881b0f6271ff6383a6e3b6662c9" DEFAULT getdate(), "createdById" uniqueidentifier NOT NULL, "updatedById" uniqueidentifier NOT NULL, "requesterId" uniqueidentifier NOT NULL, "vehicleEntityId" int NOT NULL, CONSTRAINT "PK_6ddb9ad7359a4c9a3727e6445c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_order_entity" ("id" uniqueidentifier NOT NULL, "scheduledDate" datetime, "estimatedDuration" datetime, "actualDuration" datetime, "vehicleInWorkshop" bit, "requiresApproval" bit NOT NULL CONSTRAINT "DF_8ac3fbdc58c8ce9da2d8499fc46" DEFAULT 1, "approvalDate" datetime, "status" nvarchar(25) NOT NULL, "serviceRequestEntityId" uniqueidentifier NOT NULL, "workshopEntityId" uniqueidentifier NOT NULL, "scheduledById" uniqueidentifier, "supervisorId" int, "assignedEmployeeEntityId" int, CONSTRAINT "PK_21f5736a602202482df7b9b9c86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_order_diagnostic_entity" ("id" uniqueidentifier NOT NULL, "reportedSymptoms" nvarchar(255) NOT NULL, "impactsOperability" bit NOT NULL, "issueFrequency" nvarchar(25) NOT NULL, "technicalDescription" nvarchar(255), "affectedSystems" nvarchar(255), "requiredMaterials" nvarchar(255), "workOrderEntityId" uniqueidentifier NOT NULL, "reportedByDriverId" int NOT NULL, CONSTRAINT "PK_524bf89ca783466ca9b2e9daba2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_order_service_entity" ("id" uniqueidentifier NOT NULL, "fuelLevelAtReception" int NOT NULL, "mileageAtReception" int NOT NULL, "receivedInventoryItems" nvarchar(255), "roofObservations" nvarchar(255), "frontObservations" nvarchar(255), "leftSideObservations" nvarchar(255), "rightSideObservations" nvarchar(255), "rearObservations" nvarchar(255), "performedServices" nvarchar(255), "installedReplacementParts" nvarchar(255), "addedFluids" nvarchar(255), "workOrderEntityId" uniqueidentifier NOT NULL, CONSTRAINT "PK_b4d8911f86862632df528243267" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_14e995b917d5c6bb8d2d4e9b546" FOREIGN KEY ("employeeEntityId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_request_entity" ADD CONSTRAINT "FK_7973b8164ebee81efb2d3dea95a" FOREIGN KEY ("createdById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_request_entity" ADD CONSTRAINT "FK_5b2cadf701ee3a20b7c3dfd368d" FOREIGN KEY ("updatedById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_request_entity" ADD CONSTRAINT "FK_e72e2a6915d72117c8f9ca2c195" FOREIGN KEY ("requesterId") REFERENCES "customer_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_request_entity" ADD CONSTRAINT "FK_3d82297b1a61162ebab998fe8ee" FOREIGN KEY ("vehicleEntityId") REFERENCES "TBLTRNVHC_CP"("LNGDNTTRN") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_entity" ADD CONSTRAINT "FK_ced5736c7fe2fa52a344f6d2abb" FOREIGN KEY ("serviceRequestEntityId") REFERENCES "service_request_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_entity" ADD CONSTRAINT "FK_46907166ae6a4c26c13c4dd3083" FOREIGN KEY ("workshopEntityId") REFERENCES "workshop_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_entity" ADD CONSTRAINT "FK_089c44d57682fc4396e445976d4" FOREIGN KEY ("scheduledById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_entity" ADD CONSTRAINT "FK_86399ffe83dc6a2f171aa61f3de" FOREIGN KEY ("supervisorId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_entity" ADD CONSTRAINT "FK_3c2f9c03e0fbc2f589a10d498eb" FOREIGN KEY ("assignedEmployeeEntityId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic_entity" ADD CONSTRAINT "FK_68baf4088a1def5994fad729c01" FOREIGN KEY ("workOrderEntityId") REFERENCES "work_order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic_entity" ADD CONSTRAINT "FK_9c3456cd935ab41139ee7428372" FOREIGN KEY ("reportedByDriverId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_service_entity" ADD CONSTRAINT "FK_f46b22805297a408bdef267436b" FOREIGN KEY ("workOrderEntityId") REFERENCES "work_order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_service_entity" DROP CONSTRAINT "FK_f46b22805297a408bdef267436b"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic_entity" DROP CONSTRAINT "FK_9c3456cd935ab41139ee7428372"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic_entity" DROP CONSTRAINT "FK_68baf4088a1def5994fad729c01"`);
        await queryRunner.query(`ALTER TABLE "work_order_entity" DROP CONSTRAINT "FK_3c2f9c03e0fbc2f589a10d498eb"`);
        await queryRunner.query(`ALTER TABLE "work_order_entity" DROP CONSTRAINT "FK_86399ffe83dc6a2f171aa61f3de"`);
        await queryRunner.query(`ALTER TABLE "work_order_entity" DROP CONSTRAINT "FK_089c44d57682fc4396e445976d4"`);
        await queryRunner.query(`ALTER TABLE "work_order_entity" DROP CONSTRAINT "FK_46907166ae6a4c26c13c4dd3083"`);
        await queryRunner.query(`ALTER TABLE "work_order_entity" DROP CONSTRAINT "FK_ced5736c7fe2fa52a344f6d2abb"`);
        await queryRunner.query(`ALTER TABLE "service_request_entity" DROP CONSTRAINT "FK_3d82297b1a61162ebab998fe8ee"`);
        await queryRunner.query(`ALTER TABLE "service_request_entity" DROP CONSTRAINT "FK_e72e2a6915d72117c8f9ca2c195"`);
        await queryRunner.query(`ALTER TABLE "service_request_entity" DROP CONSTRAINT "FK_5b2cadf701ee3a20b7c3dfd368d"`);
        await queryRunner.query(`ALTER TABLE "service_request_entity" DROP CONSTRAINT "FK_7973b8164ebee81efb2d3dea95a"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_14e995b917d5c6bb8d2d4e9b546"`);
        await queryRunner.query(`DROP TABLE "work_order_service_entity"`);
        await queryRunner.query(`DROP TABLE "work_order_diagnostic_entity"`);
        await queryRunner.query(`DROP TABLE "work_order_entity"`);
        await queryRunner.query(`DROP TABLE "service_request_entity"`);
        await queryRunner.query(`DROP TABLE "customer_entity"`);
        await queryRunner.query(`DROP TABLE "group_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "workshop_entity"`);
    }

}
