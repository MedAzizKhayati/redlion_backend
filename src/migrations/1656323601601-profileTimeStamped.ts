import {MigrationInterface, QueryRunner} from "typeorm";

export class profileTimeStamped1656323601601 implements MigrationInterface {
    name = 'profileTimeStamped1656323601601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`createdAt\``);
    }

}
