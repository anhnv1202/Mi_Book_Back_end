import { MigrationInterface, QueryRunner } from "typeorm";

export class PostTable1701612023569 implements MigrationInterface {
    name = 'PostTable1701612023569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`googleId\` varchar(255) NULL, \`deactive\` tinyint NOT NULL DEFAULT 0, \`email\` varchar(255) NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`phoneNumber\` varchar(255) NULL, \`role\` int NOT NULL DEFAULT '2', \`image\` varchar(255) NULL, \`dateOfBirth\` datetime NULL, \`gender\` tinyint NULL, \`address\` varchar(255) NULL, \`salary\` int NULL, UNIQUE INDEX \`user-email\` (\`email\`), UNIQUE INDEX \`user-username\` (\`username\`), UNIQUE INDEX \`user-phone\` (\`phoneNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`user-phone\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`user-username\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`user-email\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
