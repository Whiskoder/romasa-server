import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760560303686 implements MigrationInterface {
    name = 'UpdateTables1760560303686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "scheduledDate" datetime`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "estimatedDuration" datetime`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "actualDuration" datetime`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "vehicleInWorkshop" bit`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "requiresApproval" bit NOT NULL CONSTRAINT "DF_5e982cb5bdbdec11552c9eff155" DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "approvalDate" datetime`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "status" nvarchar(25) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "workshopId" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "scheduledById" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "supervisorId" int`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "assignedEmployeeId" int`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD "serviceRequestId" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "scheduledDate" datetime`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "estimatedDuration" datetime`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "actualDuration" datetime`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "vehicleInWorkshop" bit`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "requiresApproval" bit NOT NULL CONSTRAINT "DF_15de7a64f149230c2d3161f6a8e" DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "approvalDate" datetime`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "status" nvarchar(25) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "workshopId" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "scheduledById" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "supervisorId" int`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "assignedEmployeeId" int`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD "serviceRequestId" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD CONSTRAINT "FK_a744398fe4c14b0365b6dc065e7" FOREIGN KEY ("workshopId") REFERENCES "workshop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD CONSTRAINT "FK_330648d77ed61040e911eb5d7d6" FOREIGN KEY ("scheduledById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD CONSTRAINT "FK_b3e2bcd09892bd495b20a00f208" FOREIGN KEY ("supervisorId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD CONSTRAINT "FK_81d8283cb26e5dcd8ee6035b670" FOREIGN KEY ("assignedEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_service" ADD CONSTRAINT "FK_700fcdda771598fa1ad8623b239" FOREIGN KEY ("serviceRequestId") REFERENCES "service_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD CONSTRAINT "FK_978065ccdfddc36b8b5353c7980" FOREIGN KEY ("workshopId") REFERENCES "workshop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD CONSTRAINT "FK_954f3d663c38e14589e4ec9a054" FOREIGN KEY ("scheduledById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD CONSTRAINT "FK_02a194755732e56a4998ffc8428" FOREIGN KEY ("supervisorId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD CONSTRAINT "FK_efa142f3aca84c9ca6ae9b72a98" FOREIGN KEY ("assignedEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" ADD CONSTRAINT "FK_06e7f918145f0f825a61d8eb162" FOREIGN KEY ("serviceRequestId") REFERENCES "service_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP CONSTRAINT "FK_06e7f918145f0f825a61d8eb162"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP CONSTRAINT "FK_efa142f3aca84c9ca6ae9b72a98"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP CONSTRAINT "FK_02a194755732e56a4998ffc8428"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP CONSTRAINT "FK_954f3d663c38e14589e4ec9a054"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP CONSTRAINT "FK_978065ccdfddc36b8b5353c7980"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP CONSTRAINT "FK_700fcdda771598fa1ad8623b239"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP CONSTRAINT "FK_81d8283cb26e5dcd8ee6035b670"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP CONSTRAINT "FK_b3e2bcd09892bd495b20a00f208"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP CONSTRAINT "FK_330648d77ed61040e911eb5d7d6"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP CONSTRAINT "FK_a744398fe4c14b0365b6dc065e7"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "serviceRequestId"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "assignedEmployeeId"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "supervisorId"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "scheduledById"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "workshopId"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "approvalDate"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP CONSTRAINT "DF_15de7a64f149230c2d3161f6a8e"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "requiresApproval"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "vehicleInWorkshop"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "actualDuration"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "estimatedDuration"`);
        await queryRunner.query(`ALTER TABLE "work_order_diagnostic" DROP COLUMN "scheduledDate"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "serviceRequestId"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "assignedEmployeeId"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "supervisorId"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "scheduledById"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "workshopId"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "approvalDate"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP CONSTRAINT "DF_5e982cb5bdbdec11552c9eff155"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "requiresApproval"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "vehicleInWorkshop"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "actualDuration"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "estimatedDuration"`);
        await queryRunner.query(`ALTER TABLE "work_order_service" DROP COLUMN "scheduledDate"`);
    }

}
