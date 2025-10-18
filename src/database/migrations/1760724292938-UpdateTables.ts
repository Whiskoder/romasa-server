import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1760724292938 implements MigrationInterface {
    name = 'UpdateTables1760724292938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE VIEW "dbo"."employee_search_view" AS SELECT "employees"."LNGCLVEMP" AS "id", "employees"."LNGNOEMP" AS "employeeNumber", "employees"."STRRFCEMP" AS "rfc", "employees"."STRNOMEMP" AS "firstName", "employees"."STRAPPEMP" AS "fatherName", "employees"."STRAPMEMP" AS "motherName", UPPER(
					CONCAT(
						COALESCE("employees"."STRNOMEMP", ''),
						' ',
						COALESCE("employees"."STRAPMEMP", ''),
						' ',
						COALESCE("employees"."STRAPPEMP", '')
					)
				) AS "fullName" FROM "TBLCATEMP" "employees"`);
        await queryRunner.query(`INSERT INTO "BD_TALLER".."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (@0, @1, DEFAULT, @2, @3, @4)`, ["BD_TALLER","dbo","VIEW","employee_search_view","SELECT \"employees\".\"LNGCLVEMP\" AS \"id\", \"employees\".\"LNGNOEMP\" AS \"employeeNumber\", \"employees\".\"STRRFCEMP\" AS \"rfc\", \"employees\".\"STRNOMEMP\" AS \"firstName\", \"employees\".\"STRAPPEMP\" AS \"fatherName\", \"employees\".\"STRAPMEMP\" AS \"motherName\", UPPER(\n\t\t\t\t\tCONCAT(\n\t\t\t\t\t\tCOALESCE(\"employees\".\"STRNOMEMP\", ''),\n\t\t\t\t\t\t' ',\n\t\t\t\t\t\tCOALESCE(\"employees\".\"STRAPMEMP\", ''),\n\t\t\t\t\t\t' ',\n\t\t\t\t\t\tCOALESCE(\"employees\".\"STRAPPEMP\", '')\n\t\t\t\t\t)\n\t\t\t\t) AS \"fullName\" FROM \"TBLCATEMP\" \"employees\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "BD_TALLER".."typeorm_metadata" WHERE "type" = @0 AND "name" = @1 AND "database" = @2 AND "schema" = @3`, ["VIEW","employee_search_view","BD_TALLER","dbo"]);
        await queryRunner.query(`DROP VIEW "employee_search_view"`);
    }

}
