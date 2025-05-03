import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshToken1746270946389 implements MigrationInterface {
    name = 'RefreshToken1746270946389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "refresh_token" (
                "id" varchar PRIMARY KEY NOT NULL,
                "token" varchar NOT NULL,
                "expiryDate" datetime NOT NULL,
                "userId" varchar
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" varchar PRIMARY KEY NOT NULL,
                "email" varchar NOT NULL,
                "password" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_refresh_token" (
                "id" varchar PRIMARY KEY NOT NULL,
                "token" varchar NOT NULL,
                "expiryDate" datetime NOT NULL,
                "userId" varchar,
                CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_refresh_token"("id", "token", "expiryDate", "userId")
            SELECT "id",
                "token",
                "expiryDate",
                "userId"
            FROM "refresh_token"
        `);
        await queryRunner.query(`
            DROP TABLE "refresh_token"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_refresh_token"
                RENAME TO "refresh_token"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
                RENAME TO "temporary_refresh_token"
        `);
        await queryRunner.query(`
            CREATE TABLE "refresh_token" (
                "id" varchar PRIMARY KEY NOT NULL,
                "token" varchar NOT NULL,
                "expiryDate" datetime NOT NULL,
                "userId" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "refresh_token"("id", "token", "expiryDate", "userId")
            SELECT "id",
                "token",
                "expiryDate",
                "userId"
            FROM "temporary_refresh_token"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_refresh_token"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "refresh_token"
        `);
    }

}
