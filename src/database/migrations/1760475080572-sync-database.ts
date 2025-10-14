import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncDatabase1760475080572 implements MigrationInterface {
    name = 'SyncDatabase1760475080572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop_entity" ADD "createdAt" datetime NOT NULL CONSTRAINT "DF_2696fa4a0f0781a36ddd7f1f3b4" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "workshop_entity" ADD "updatedAt" datetime NOT NULL CONSTRAINT "DF_50cded9c08ab730cc604ed3bc03" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "createdAt" datetime NOT NULL CONSTRAINT "DF_913e686ead5d737723c6ad7e5c2" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "updatedAt" datetime NOT NULL CONSTRAINT "DF_24c12b2d131518f09ba09e0e954" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "work_order_service_entity" ALTER COLUMN "fuelLevelAtReception" int`);
        await queryRunner.query(`ALTER TABLE "work_order_service_entity" ALTER COLUMN "mileageAtReception" int`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_service_entity" ALTER COLUMN "mileageAtReception" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_order_service_entity" ALTER COLUMN "fuelLevelAtReception" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP CONSTRAINT "DF_24c12b2d131518f09ba09e0e954"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP CONSTRAINT "DF_913e686ead5d737723c6ad7e5c2"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "workshop_entity" DROP CONSTRAINT "DF_50cded9c08ab730cc604ed3bc03"`);
        await queryRunner.query(`ALTER TABLE "workshop_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "workshop_entity" DROP CONSTRAINT "DF_2696fa4a0f0781a36ddd7f1f3b4"`);
        await queryRunner.query(`ALTER TABLE "workshop_entity" DROP COLUMN "createdAt"`);
    }

}
