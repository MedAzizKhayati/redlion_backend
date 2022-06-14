import {MigrationInterface, QueryRunner} from "typeorm";

export class idToIntMigration1655216562303 implements MigrationInterface {
    name = 'idToIntMigration1655216562303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`DROP INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD UNIQUE INDEX \`IDX_a24972ebd73b106250713dcddd\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`DROP INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP INDEX \`IDX_a24972ebd73b106250713dcddd\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
