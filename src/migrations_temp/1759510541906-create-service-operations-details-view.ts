import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateServiceOperationsDetailsView1759510541906
  implements MigrationInterface
{
  name = 'CreateServiceOperationsDetailsView1759510541906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DROP INDEX "TBLCATEMP$ClientesIdClientes" ON "TBLCATEMP"`);
    // await queryRunner.query(`DROP INDEX "TBLCATEMP$Id" ON "TBLCATEMP"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "Nombre"`);
    await queryRunner.query(
      `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_f0bde98434ab631af91005539e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_23b236f1a336509c87863ed0c49"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_d093ecef300b191a892e89aa82b"`,
    );
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "LNGCLVEMP"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD "LNGCLVEMP" int NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD CONSTRAINT "PK_dc2b08a8089f60a105b512ba22a" PRIMARY KEY ("LNGCLVEMP")`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP CONSTRAINT "DF_2e58de69cf290138a0e962064c9"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "STRLOCEMP"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD "STRLOCEMP" nvarchar(150)`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "STRNSSEMP"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD "STRNSSEMP" nvarchar(50)`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "STRDPTEMP"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD "STRDPTEMP" nvarchar(255)`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "STRPSTEMP"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD "STRPSTEMP" nvarchar(255)`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP CONSTRAINT "DF_e4d4c750aca056535da18661a2e"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "STRNCKEMP"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD "STRNCKEMP" nvarchar(100)`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "STRPWSEMP"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD "STRPWSEMP" nvarchar(100)`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP CONSTRAINT "DF_49dbd50580e9983db1ec9044de0"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP CONSTRAINT "DF_3c97cd8ff29381805a72e75c205"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP CONSTRAINT "DF_13281011937dd948cc4b9ac3300"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP CONSTRAINT "DF_9367a38e49f123e9b0de7ad84da"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "DTFCHRGS"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD "DTFCHRGS" nvarchar(10)`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP CONSTRAINT "DF_a09f6241950cd294134034b0558"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "LNGCLVMPL_RGS"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD "LNGCLVMPL_RGS" int`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP CONSTRAINT "DF_06b9e50b914f784b17ffa194bb7"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "DTFCHPDT"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD "DTFCHPDT" nvarchar(10)`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP CONSTRAINT "DF_50e8689f5343b41b3569fa6ef7b"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "LNGCLVMPL_PDT"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD "LNGCLVMPL_PDT" int`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP CONSTRAINT "DF_c2a36047c72d71b7d6c0d635c5f"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "SSMA_TimeStamp"`);
    // await queryRunner.query(`ALTER TABLE "TBLCATEMP" ADD "SSMA_TimeStamp" int NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_761957cd77cec26dc3276225189"`,
    );
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "PK_164f7f5ae561a5ae8f96953dd3d"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP COLUMN "LNGDNTTRN"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" ADD "LNGDNTTRN" int NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "PK_164f7f5ae561a5ae8f96953dd3d" PRIMARY KEY ("LNGDNTTRN")`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "DF_3f24815b7736116482437a866b3"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "DF_3af4fa2fe5c31d4ad67e22fac96"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "DF_289616fd56b2a1488d46c28f3ac"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "DF_e8f84c29c6e03c619d9ec3b612e"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "DF_3ae82008596e745ab3b9dd9c557"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "DF_a87f8543bac64b3c42c98689b6a"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" ALTER COLUMN "DTFCHRGS" datetime2(0) NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "DF_54f3ecbc0dcb0ab6fc75975fc48" DEFAULT getdate() FOR "DTFCHRGS"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "DF_a8731d6aea6da718ee88b8ba0fe"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "DF_580523d57b2cb59c3bf376e785c"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" ALTER COLUMN "DTFCHPDT" datetime2(0) NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "DF_eb00fdafc6c2c25a99d88919aba" DEFAULT getdate() FOR "DTFCHPDT"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "DF_3bd8bded47d258f20cfea432def"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "DF_1e1a1c7bbde58d1d9accda7c866"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" DROP COLUMN "SSMA_TimeStamp"`);
    // await queryRunner.query(`ALTER TABLE "TBLTRNVHC_CP" ADD "SSMA_TimeStamp" int NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_f0bde98434ab631af91005539e2" FOREIGN KEY ("createdByEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_23b236f1a336509c87863ed0c49" FOREIGN KEY ("departmentManagerEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_d093ecef300b191a892e89aa82b" FOREIGN KEY ("vehicleDriverEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_761957cd77cec26dc3276225189" FOREIGN KEY ("vehicleId") REFERENCES "TBLTRNVHC_CP"("LNGDNTTRN") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE VIEW "dbo"."service_operation_details" AS SELECT "serviceOperation"."id" AS "id", "serviceOperation"."createdAt" AS "createdAt", "serviceOperation"."updatedAt" AS "updatedAt", "createdByEmployee"."STRNOMEMP" AS "createdByEmployeeFirstName", "createdByEmployee"."STRAPPEMP" AS "createdByEmployeeLastName", "createdByEmployee"."STRAPMEMP" AS "createdByEmployeeMiddleName", "departmentManagerEmployee"."STRNOMEMP" AS "departmentManagerEmployeeFirstName", "departmentManagerEmployee"."STRAPPEMP" AS "departmentManagerEmployeeLastName", "departmentManagerEmployee"."STRAPMEMP" AS "departmentManagerEmployeeMiddleName", "vehicleDriverEmployee"."STRNOMEMP" AS "vehicleDriverEmployeeFirstName", "vehicleDriverEmployee"."STRAPPEMP" AS "vehicleDriverEmployeeLastName", "vehicleDriverEmployee"."STRAPMEMP" AS "vehicleDriverEmployeeMiddleName", "vehicle"."STRNMRTRN" AS "vehicleTransportNumber", "vehicle"."LNGCLVSTP" AS "vehicleTransportSubTypeId", "vehicle"."STRMRCTRN" AS "vehicleBrand", "vehicle"."STRMDLTRN" AS "vehicleModel", "vehicle"."STRAÑOTRN" AS "vehicleManufactureYear", "vehicle"."STRNSRTRN" AS "vehicleVerificationNumber", "vehicle"."STRPLCTRN" AS "vehicleLicensePlate" FROM "service_operations" "serviceOperation" LEFT JOIN "TBLCATEMP" "createdByEmployee" ON "createdByEmployee"."LNGCLVEMP"="serviceOperation"."createdByEmployeeId"  LEFT JOIN "TBLCATEMP" "departmentManagerEmployee" ON "departmentManagerEmployee"."LNGCLVEMP"="serviceOperation"."departmentManagerEmployeeId"  LEFT JOIN "TBLCATEMP" "vehicleDriverEmployee" ON "vehicleDriverEmployee"."LNGCLVEMP"="serviceOperation"."vehicleDriverEmployeeId"  LEFT JOIN "TBLTRNVHC_CP" "vehicle" ON "vehicle"."LNGDNTTRN"="serviceOperation"."vehicleId"`,
    );
    await queryRunner.query(
      `INSERT INTO "romasa-db-development".."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (@0, @1, DEFAULT, @2, @3, @4)`,
      [
        'romasa-db-development',
        'dbo',
        'VIEW',
        'service_operation_details',
        'SELECT "serviceOperation"."id" AS "id", "serviceOperation"."createdAt" AS "createdAt", "serviceOperation"."updatedAt" AS "updatedAt", "createdByEmployee"."STRNOMEMP" AS "createdByEmployeeFirstName", "createdByEmployee"."STRAPPEMP" AS "createdByEmployeeLastName", "createdByEmployee"."STRAPMEMP" AS "createdByEmployeeMiddleName", "departmentManagerEmployee"."STRNOMEMP" AS "departmentManagerEmployeeFirstName", "departmentManagerEmployee"."STRAPPEMP" AS "departmentManagerEmployeeLastName", "departmentManagerEmployee"."STRAPMEMP" AS "departmentManagerEmployeeMiddleName", "vehicleDriverEmployee"."STRNOMEMP" AS "vehicleDriverEmployeeFirstName", "vehicleDriverEmployee"."STRAPPEMP" AS "vehicleDriverEmployeeLastName", "vehicleDriverEmployee"."STRAPMEMP" AS "vehicleDriverEmployeeMiddleName", "vehicle"."STRNMRTRN" AS "vehicleTransportNumber", "vehicle"."LNGCLVSTP" AS "vehicleTransportSubTypeId", "vehicle"."STRMRCTRN" AS "vehicleBrand", "vehicle"."STRMDLTRN" AS "vehicleModel", "vehicle"."STRAÑOTRN" AS "vehicleManufactureYear", "vehicle"."STRNSRTRN" AS "vehicleVerificationNumber", "vehicle"."STRPLCTRN" AS "vehicleLicensePlate" FROM "service_operations" "serviceOperation" LEFT JOIN "TBLCATEMP" "createdByEmployee" ON "createdByEmployee"."LNGCLVEMP"="serviceOperation"."createdByEmployeeId"  LEFT JOIN "TBLCATEMP" "departmentManagerEmployee" ON "departmentManagerEmployee"."LNGCLVEMP"="serviceOperation"."departmentManagerEmployeeId"  LEFT JOIN "TBLCATEMP" "vehicleDriverEmployee" ON "vehicleDriverEmployee"."LNGCLVEMP"="serviceOperation"."vehicleDriverEmployeeId"  LEFT JOIN "TBLTRNVHC_CP" "vehicle" ON "vehicle"."LNGDNTTRN"="serviceOperation"."vehicleId"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "romasa-db-development".."typeorm_metadata" WHERE "type" = @0 AND "name" = @1 AND "database" = @2 AND "schema" = @3`,
      ['VIEW', 'service_operation_details', 'romasa-db-development', 'dbo'],
    );
    await queryRunner.query(`DROP VIEW "service_operation_details"`);
    await queryRunner.query(
      `ALTER TABLE "service_operations" DROP CONSTRAINT "FK_761957cd77cec26dc3276225189"`,
    );
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
      `ALTER TABLE "TBLTRNVHC_CP" DROP COLUMN "SSMA_TimeStamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD "SSMA_TimeStamp" timestamp NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "DF_1e1a1c7bbde58d1d9accda7c866" DEFAULT 0 FOR "LNGCLVQPM_PDT"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "DF_3bd8bded47d258f20cfea432def" DEFAULT 0 FOR "LNGCLVMPL_PDT"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "DF_eb00fdafc6c2c25a99d88919aba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ALTER COLUMN "DTFCHPDT" datetime2(0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "DF_580523d57b2cb59c3bf376e785c" DEFAULT 0 FOR "LNGCLVQPM_RGS"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "DF_a8731d6aea6da718ee88b8ba0fe" DEFAULT 0 FOR "LNGCLVMPL_RGS"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "DF_54f3ecbc0dcb0ab6fc75975fc48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ALTER COLUMN "DTFCHRGS" datetime2(0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "DF_a87f8543bac64b3c42c98689b6a" DEFAULT 0 FOR "MNDIMPADQ"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "DF_3ae82008596e745ab3b9dd9c557" DEFAULT 0 FOR "LNGCLVCHF"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "DF_e8f84c29c6e03c619d9ec3b612e" DEFAULT 0 FOR "LNGCLVENT"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "DF_289616fd56b2a1488d46c28f3ac" DEFAULT 0 FOR "LNGKLMVHC"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "DF_3af4fa2fe5c31d4ad67e22fac96" DEFAULT 0 FOR "DCMPBRTRN"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "DF_3f24815b7736116482437a866b3" DEFAULT 0 FOR "LNGCLVSTP"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" DROP CONSTRAINT "PK_164f7f5ae561a5ae8f96953dd3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" DROP COLUMN "LNGDNTTRN"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD "LNGDNTTRN" int NOT NULL IDENTITY(1,1)`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLTRNVHC_CP" ADD CONSTRAINT "PK_164f7f5ae561a5ae8f96953dd3d" PRIMARY KEY ("LNGDNTTRN")`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_761957cd77cec26dc3276225189" FOREIGN KEY ("vehicleId") REFERENCES "TBLTRNVHC_CP"("LNGDNTTRN") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" DROP COLUMN "SSMA_TimeStamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "SSMA_TimeStamp" timestamp NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD CONSTRAINT "DF_c2a36047c72d71b7d6c0d635c5f" DEFAULT 0 FOR "LNGCLVQPM_PDT"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" DROP COLUMN "LNGCLVMPL_PDT"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "LNGCLVMPL_PDT" float`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD CONSTRAINT "DF_50e8689f5343b41b3569fa6ef7b" DEFAULT 0 FOR "LNGCLVMPL_PDT"`,
    );
    await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "DTFCHPDT"`);
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "DTFCHPDT" nvarchar(25)`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD CONSTRAINT "DF_06b9e50b914f784b17ffa194bb7" DEFAULT 0 FOR "LNGCLVQPM_RGS"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" DROP COLUMN "LNGCLVMPL_RGS"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "LNGCLVMPL_RGS" float`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD CONSTRAINT "DF_a09f6241950cd294134034b0558" DEFAULT 0 FOR "LNGCLVMPL_RGS"`,
    );
    await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "DTFCHRGS"`);
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "DTFCHRGS" nvarchar(25)`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD CONSTRAINT "DF_9367a38e49f123e9b0de7ad84da" DEFAULT 0 FOR "LNGCLVMPL_BLQ"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD CONSTRAINT "DF_13281011937dd948cc4b9ac3300" DEFAULT 0 FOR "BLNBLQRGS"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD CONSTRAINT "DF_3c97cd8ff29381805a72e75c205" DEFAULT 0 FOR "Suspendido"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD CONSTRAINT "DF_49dbd50580e9983db1ec9044de0" DEFAULT 0 FOR "DBLPRCDST"`,
    );
    await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "STRPWSEMP"`);
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "STRPWSEMP" nvarchar(10)`,
    );
    await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "STRNCKEMP"`);
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "STRNCKEMP" nvarchar(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD CONSTRAINT "DF_e4d4c750aca056535da18661a2e" DEFAULT 0 FOR "BLNUSREMP"`,
    );
    await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "STRPSTEMP"`);
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "STRPSTEMP" nvarchar(50)`,
    );
    await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "STRDPTEMP"`);
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "STRDPTEMP" nvarchar(50)`,
    );
    await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "STRNSSEMP"`);
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "STRNSSEMP" nvarchar(15)`,
    );
    await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "STRLOCEMP"`);
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "STRLOCEMP" nvarchar(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD CONSTRAINT "DF_2e58de69cf290138a0e962064c9" DEFAULT 0 FOR "LNGNOEMP"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" DROP CONSTRAINT "PK_dc2b08a8089f60a105b512ba22a"`,
    );
    await queryRunner.query(`ALTER TABLE "TBLCATEMP" DROP COLUMN "LNGCLVEMP"`);
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "LNGCLVEMP" int NOT NULL IDENTITY(1,1)`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_d093ecef300b191a892e89aa82b" FOREIGN KEY ("vehicleDriverEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_23b236f1a336509c87863ed0c49" FOREIGN KEY ("departmentManagerEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_operations" ADD CONSTRAINT "FK_f0bde98434ab631af91005539e2" FOREIGN KEY ("createdByEmployeeId") REFERENCES "TBLCATEMP"("LNGCLVEMP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "TBLCATEMP" ADD "Nombre" nvarchar(50)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "TBLCATEMP$Id" ON "TBLCATEMP" ("LNGCLVEMP") `,
    );
    await queryRunner.query(
      `CREATE INDEX "TBLCATEMP$ClientesIdClientes" ON "TBLCATEMP" ("LNGNOEMP") `,
    );
  }
}
