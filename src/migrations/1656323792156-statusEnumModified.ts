import {MigrationInterface, QueryRunner} from "typeorm";

export class statusEnumModified1656323792156 implements MigrationInterface {
    name = 'statusEnumModified1656323792156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` enum ('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` enum ('PENDING', 'APPROVED') NOT NULL DEFAULT ''PENDING''`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
    }

}
