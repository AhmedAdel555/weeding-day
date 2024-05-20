import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderTable1716163071516 implements MigrationInterface {
    name = 'AddOrderTable1716163071516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` datetime NOT NULL, \`price\` int NOT NULL, \`service_name\` varchar(255) NOT NULL, \`weedingHallId\` int NULL, \`barberId\` int NULL, \`beautySalonId\` int NULL, \`manSuitId\` int NULL, \`womenAtelierId\` int NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_caabe91507b3379c7ba73637b8\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_739a5ab6573642403bd479ebed8\` FOREIGN KEY (\`weedingHallId\`) REFERENCES \`weeding_hall\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_fc2f7095afc4d205e5678f3cf76\` FOREIGN KEY (\`barberId\`) REFERENCES \`barber\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_434dcdef1bf2ccc5de995547704\` FOREIGN KEY (\`beautySalonId\`) REFERENCES \`beauty_salon\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_b69ae6b6890499f2091ea7439fc\` FOREIGN KEY (\`manSuitId\`) REFERENCES \`mans_suit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_63e614aca74fb5f489ac031a512\` FOREIGN KEY (\`womenAtelierId\`) REFERENCES \`womens_atelier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_63e614aca74fb5f489ac031a512\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_b69ae6b6890499f2091ea7439fc\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_434dcdef1bf2ccc5de995547704\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_fc2f7095afc4d205e5678f3cf76\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_739a5ab6573642403bd479ebed8\``);
        await queryRunner.query(`DROP INDEX \`REL_caabe91507b3379c7ba73637b8\` ON \`order\``);
        await queryRunner.query(`DROP TABLE \`order\``);
    }

}
