import {MigrationInterface, QueryRunner} from "typeorm";

export class deletedAt1655220804763 implements MigrationInterface {
    name = 'deletedAt1655220804763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a24972ebd73b106250713dcddd\` ON \`profile\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a24972ebd73b106250713dcddd\` ON \`profile\` (\`userId\`)`);
    }

}
