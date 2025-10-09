// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class CreateUserTable1759596216316 implements MigrationInterface {
//   name = 'CreateUserTable1759596216316';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `CREATE TABLE "users" ("id" uniqueidentifier NOT NULL, "role" nvarchar(50) NOT NULL, "hashedPassword" nvarchar(60), "email" nvarchar(255) NOT NULL, "isActive" bit NOT NULL CONSTRAINT "DF_409a0298fdd86a6495e23c25c66" DEFAULT 1, "encryptedTokenSecret" varbinary(255) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_204e9b624861ff4a5b268192101" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_0f5cbe00928ba4489cc7312573b" DEFAULT getdate(), "employeeId" int, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE "refresh_tokens" ("id" uniqueidentifier NOT NULL, "token" text NOT NULL, "revoked" bit NOT NULL CONSTRAINT "DF_36c7f5a6a8d1c7c23470457dc3b" DEFAULT 0, "createdAt" datetime NOT NULL CONSTRAINT "DF_98c0562c3afc78514a32f560459" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_128d39388b2d6cbeb68585d520a" DEFAULT getdate(), "userId" uniqueidentifier, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE "one_time_tokens" ("id" uniqueidentifier NOT NULL, "tokenType" nvarchar(50) NOT NULL, "tokenHash" nvarchar(72) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_377e1bfd7b745c6e9ea6145574b" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_d9c0d8a19a04ec49e7d96932cd5" DEFAULT getdate(), "userId" uniqueidentifier, CONSTRAINT "PK_8e470cc9ffc1b2afa054304db17" PRIMARY KEY ("id"))`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_761957cd77cec26dc3276225189"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_f0bde98434ab631af91005539e2"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_23b236f1a336509c87863ed0c49"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_d093ecef300b191a892e89aa82b"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "users" ADD CONSTRAINT "FK_a7191f881489123fab6c8e52738" FOREIGN KEY ("employeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "one_time_tokens" ADD CONSTRAINT "FK_c050f9d5e8a16e1a30a98c7257f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_f0bde98434ab631af91005539e2" FOREIGN KEY ("createdByEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_23b236f1a336509c87863ed0c49" FOREIGN KEY ("departmentManagerEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_d093ecef300b191a892e89aa82b" FOREIGN KEY ("vehicleDriverEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_761957cd77cec26dc3276225189" FOREIGN KEY ("vehicleId") REFERENCES "TBLTRNVHC_CP"("LNGDNTTRN") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_761957cd77cec26dc3276225189"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_d093ecef300b191a892e89aa82b"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_23b236f1a336509c87863ed0c49"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_f0bde98434ab631af91005539e2"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "one_time_tokens" DROP CONSTRAINT "FK_c050f9d5e8a16e1a30a98c7257f"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "users" DROP CONSTRAINT "FK_a7191f881489123fab6c8e52738"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_d093ecef300b191a892e89aa82b" FOREIGN KEY ("vehicleDriverEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_23b236f1a336509c87863ed0c49" FOREIGN KEY ("departmentManagerEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_f0bde98434ab631af91005539e2" FOREIGN KEY ("createdByEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_761957cd77cec26dc3276225189" FOREIGN KEY ("vehicleId") REFERENCES "TBLTRNVHC_CP"("LNGDNTTRN") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(`DROP TABLE "one_time_tokens"`);
//     await queryRunner.query(`DROP TABLE "refresh_tokens"`);
//     await queryRunner.query(`DROP TABLE "users"`);
//   }
// }
