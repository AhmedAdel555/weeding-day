import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1715613673103 implements MigrationInterface {
    name = 'InitDatabase1715613673103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`womens_atelier_number\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(255) NOT NULL, \`womensAtelierId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`business_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`category_name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`picture\` varchar(255) NULL, \`phone_number\` varchar(255) NOT NULL, \`role\` enum ('admin', 'vendor', 'user') NOT NULL DEFAULT 'user', \`businessCategoryId\` int NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_638bac731294171648258260ff\` (\`password\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`womens_atelier_products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_description\` varchar(255) NOT NULL, \`sale_price\` int NOT NULL, \`rent_price\` int NOT NULL, \`picture\` varchar(255) NOT NULL, \`womensAtelierId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`womens_atelier\` (\`id\` int NOT NULL AUTO_INCREMENT, \`business_name\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`facebook_url\` varchar(255) NULL, \`instagram_url\` varchar(255) NULL, \`zib_code\` int NOT NULL, \`city\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_e534651d4a7389ac0773dcc83d\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`womens_atelier_pictures\` (\`id\` int NOT NULL AUTO_INCREMENT, \`picture\` varchar(255) NOT NULL, \`womensAtelierId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`weeding_hall_meals_packages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`meals_count\` int NOT NULL, \`price\` int NOT NULL, \`weedingHallId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`weeding_hall_seats_packages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`seats_count\` int NOT NULL, \`price\` int NOT NULL, \`weedingHallId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`weeding_hall_custom_packages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`package_description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`weedingHallId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`weeding_hall_number\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(255) NOT NULL, \`weedingHallId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`weeding_hall_pictures\` (\`id\` int NOT NULL AUTO_INCREMENT, \`picture\` varchar(255) NOT NULL, \`weedingHallId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`weeding_hall\` (\`id\` int NOT NULL AUTO_INCREMENT, \`business_name\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`facebook_url\` varchar(255) NULL, \`instagram_url\` varchar(255) NULL, \`zib_code\` int NOT NULL, \`city\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`out_door\` tinyint NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_6ac04df8c86da8d9821b481193\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mans_suit_number\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(255) NOT NULL, \`mansSuitId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mans_suit_products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_description\` varchar(255) NOT NULL, \`sale_price\` int NOT NULL, \`rent_price\` int NOT NULL, \`picture\` varchar(255) NOT NULL, \`mansSuitId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mans_suit_pictures\` (\`id\` int NOT NULL AUTO_INCREMENT, \`picture\` varchar(255) NOT NULL, \`mansSuitId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mans_suit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`business_name\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`facebook_url\` varchar(255) NULL, \`instagram_url\` varchar(255) NULL, \`zib_code\` int NOT NULL, \`city\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_a23f50439caa60be614ccf033a\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`beauty_salon_custom_packages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`package_description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`beautySalonId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`beauty_salon_number\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(255) NOT NULL, \`beautySalonId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`beauty_salon_pictures\` (\`id\` int NOT NULL AUTO_INCREMENT, \`picture\` varchar(255) NOT NULL, \`beautySalonId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`beauty_salon\` (\`id\` int NOT NULL AUTO_INCREMENT, \`business_name\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`facebook_url\` varchar(255) NULL, \`instagram_url\` varchar(255) NULL, \`zib_code\` int NOT NULL, \`city\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_8303b9604f47f589c348d3c6c6\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`barber_custom_packages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`package_description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`barberId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`barber_pictures\` (\`id\` int NOT NULL AUTO_INCREMENT, \`picture\` varchar(255) NOT NULL, \`barberId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`barber_number\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(255) NOT NULL, \`barberId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`barber\` (\`id\` int NOT NULL AUTO_INCREMENT, \`business_name\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`facebook_url\` varchar(255) NULL, \`instagram_url\` varchar(255) NULL, \`zib_code\` int NOT NULL, \`city\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_439d62d0bd4e9209b5eb9bc87d\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`womens_atelier_number\` ADD CONSTRAINT \`FK_2e6ffc6bbc195d96aa018c19faa\` FOREIGN KEY (\`womensAtelierId\`) REFERENCES \`womens_atelier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_5954377d0dc3cf0d3580a1ea10f\` FOREIGN KEY (\`businessCategoryId\`) REFERENCES \`business_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`womens_atelier_products\` ADD CONSTRAINT \`FK_935be5aed296be2107cc035a4d0\` FOREIGN KEY (\`womensAtelierId\`) REFERENCES \`womens_atelier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`womens_atelier\` ADD CONSTRAINT \`FK_e534651d4a7389ac0773dcc83d9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`womens_atelier_pictures\` ADD CONSTRAINT \`FK_06b61095cda2790b27fe7ab7f65\` FOREIGN KEY (\`womensAtelierId\`) REFERENCES \`womens_atelier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`weeding_hall_meals_packages\` ADD CONSTRAINT \`FK_1e5b10cae9a8f27c71bf28fe0a4\` FOREIGN KEY (\`weedingHallId\`) REFERENCES \`weeding_hall\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`weeding_hall_seats_packages\` ADD CONSTRAINT \`FK_029c1d61d01c69b30a8776e70b2\` FOREIGN KEY (\`weedingHallId\`) REFERENCES \`weeding_hall\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`weeding_hall_custom_packages\` ADD CONSTRAINT \`FK_5e98fa9d2797a979a9d08fb757e\` FOREIGN KEY (\`weedingHallId\`) REFERENCES \`weeding_hall\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`weeding_hall_number\` ADD CONSTRAINT \`FK_cba81f3a200d40f0c235e23b2af\` FOREIGN KEY (\`weedingHallId\`) REFERENCES \`weeding_hall\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`weeding_hall_pictures\` ADD CONSTRAINT \`FK_666c282e1cb779cb548b25d781c\` FOREIGN KEY (\`weedingHallId\`) REFERENCES \`weeding_hall\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`weeding_hall\` ADD CONSTRAINT \`FK_6ac04df8c86da8d9821b4811935\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mans_suit_number\` ADD CONSTRAINT \`FK_5891cf8a4b8f8d310a850603ffe\` FOREIGN KEY (\`mansSuitId\`) REFERENCES \`mans_suit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mans_suit_products\` ADD CONSTRAINT \`FK_05ea5f2376e0378eb94c6c003e7\` FOREIGN KEY (\`mansSuitId\`) REFERENCES \`mans_suit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mans_suit_pictures\` ADD CONSTRAINT \`FK_1ddf5a3dc217d0dd80ee43757d1\` FOREIGN KEY (\`mansSuitId\`) REFERENCES \`mans_suit\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mans_suit\` ADD CONSTRAINT \`FK_a23f50439caa60be614ccf033a9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beauty_salon_custom_packages\` ADD CONSTRAINT \`FK_767c0a7635627986000b7ff1f21\` FOREIGN KEY (\`beautySalonId\`) REFERENCES \`beauty_salon\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beauty_salon_number\` ADD CONSTRAINT \`FK_10dd041dd3055ab52f5dfaebe8f\` FOREIGN KEY (\`beautySalonId\`) REFERENCES \`beauty_salon\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beauty_salon_pictures\` ADD CONSTRAINT \`FK_64fceb9629b77b34555356c1fd8\` FOREIGN KEY (\`beautySalonId\`) REFERENCES \`beauty_salon\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beauty_salon\` ADD CONSTRAINT \`FK_8303b9604f47f589c348d3c6c6e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`barber_custom_packages\` ADD CONSTRAINT \`FK_3e217f26c0dc404d61a38f227ea\` FOREIGN KEY (\`barberId\`) REFERENCES \`barber\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`barber_pictures\` ADD CONSTRAINT \`FK_ff301ac47e6f4184acc977b2387\` FOREIGN KEY (\`barberId\`) REFERENCES \`barber\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`barber_number\` ADD CONSTRAINT \`FK_c4e7ee92359a1b7db48b5dd4a6b\` FOREIGN KEY (\`barberId\`) REFERENCES \`barber\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`barber\` ADD CONSTRAINT \`FK_439d62d0bd4e9209b5eb9bc87de\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`barber\` DROP FOREIGN KEY \`FK_439d62d0bd4e9209b5eb9bc87de\``);
        await queryRunner.query(`ALTER TABLE \`barber_number\` DROP FOREIGN KEY \`FK_c4e7ee92359a1b7db48b5dd4a6b\``);
        await queryRunner.query(`ALTER TABLE \`barber_pictures\` DROP FOREIGN KEY \`FK_ff301ac47e6f4184acc977b2387\``);
        await queryRunner.query(`ALTER TABLE \`barber_custom_packages\` DROP FOREIGN KEY \`FK_3e217f26c0dc404d61a38f227ea\``);
        await queryRunner.query(`ALTER TABLE \`beauty_salon\` DROP FOREIGN KEY \`FK_8303b9604f47f589c348d3c6c6e\``);
        await queryRunner.query(`ALTER TABLE \`beauty_salon_pictures\` DROP FOREIGN KEY \`FK_64fceb9629b77b34555356c1fd8\``);
        await queryRunner.query(`ALTER TABLE \`beauty_salon_number\` DROP FOREIGN KEY \`FK_10dd041dd3055ab52f5dfaebe8f\``);
        await queryRunner.query(`ALTER TABLE \`beauty_salon_custom_packages\` DROP FOREIGN KEY \`FK_767c0a7635627986000b7ff1f21\``);
        await queryRunner.query(`ALTER TABLE \`mans_suit\` DROP FOREIGN KEY \`FK_a23f50439caa60be614ccf033a9\``);
        await queryRunner.query(`ALTER TABLE \`mans_suit_pictures\` DROP FOREIGN KEY \`FK_1ddf5a3dc217d0dd80ee43757d1\``);
        await queryRunner.query(`ALTER TABLE \`mans_suit_products\` DROP FOREIGN KEY \`FK_05ea5f2376e0378eb94c6c003e7\``);
        await queryRunner.query(`ALTER TABLE \`mans_suit_number\` DROP FOREIGN KEY \`FK_5891cf8a4b8f8d310a850603ffe\``);
        await queryRunner.query(`ALTER TABLE \`weeding_hall\` DROP FOREIGN KEY \`FK_6ac04df8c86da8d9821b4811935\``);
        await queryRunner.query(`ALTER TABLE \`weeding_hall_pictures\` DROP FOREIGN KEY \`FK_666c282e1cb779cb548b25d781c\``);
        await queryRunner.query(`ALTER TABLE \`weeding_hall_number\` DROP FOREIGN KEY \`FK_cba81f3a200d40f0c235e23b2af\``);
        await queryRunner.query(`ALTER TABLE \`weeding_hall_custom_packages\` DROP FOREIGN KEY \`FK_5e98fa9d2797a979a9d08fb757e\``);
        await queryRunner.query(`ALTER TABLE \`weeding_hall_seats_packages\` DROP FOREIGN KEY \`FK_029c1d61d01c69b30a8776e70b2\``);
        await queryRunner.query(`ALTER TABLE \`weeding_hall_meals_packages\` DROP FOREIGN KEY \`FK_1e5b10cae9a8f27c71bf28fe0a4\``);
        await queryRunner.query(`ALTER TABLE \`womens_atelier_pictures\` DROP FOREIGN KEY \`FK_06b61095cda2790b27fe7ab7f65\``);
        await queryRunner.query(`ALTER TABLE \`womens_atelier\` DROP FOREIGN KEY \`FK_e534651d4a7389ac0773dcc83d9\``);
        await queryRunner.query(`ALTER TABLE \`womens_atelier_products\` DROP FOREIGN KEY \`FK_935be5aed296be2107cc035a4d0\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_5954377d0dc3cf0d3580a1ea10f\``);
        await queryRunner.query(`ALTER TABLE \`womens_atelier_number\` DROP FOREIGN KEY \`FK_2e6ffc6bbc195d96aa018c19faa\``);
        await queryRunner.query(`DROP INDEX \`REL_439d62d0bd4e9209b5eb9bc87d\` ON \`barber\``);
        await queryRunner.query(`DROP TABLE \`barber\``);
        await queryRunner.query(`DROP TABLE \`barber_number\``);
        await queryRunner.query(`DROP TABLE \`barber_pictures\``);
        await queryRunner.query(`DROP TABLE \`barber_custom_packages\``);
        await queryRunner.query(`DROP INDEX \`REL_8303b9604f47f589c348d3c6c6\` ON \`beauty_salon\``);
        await queryRunner.query(`DROP TABLE \`beauty_salon\``);
        await queryRunner.query(`DROP TABLE \`beauty_salon_pictures\``);
        await queryRunner.query(`DROP TABLE \`beauty_salon_number\``);
        await queryRunner.query(`DROP TABLE \`beauty_salon_custom_packages\``);
        await queryRunner.query(`DROP INDEX \`REL_a23f50439caa60be614ccf033a\` ON \`mans_suit\``);
        await queryRunner.query(`DROP TABLE \`mans_suit\``);
        await queryRunner.query(`DROP TABLE \`mans_suit_pictures\``);
        await queryRunner.query(`DROP TABLE \`mans_suit_products\``);
        await queryRunner.query(`DROP TABLE \`mans_suit_number\``);
        await queryRunner.query(`DROP INDEX \`REL_6ac04df8c86da8d9821b481193\` ON \`weeding_hall\``);
        await queryRunner.query(`DROP TABLE \`weeding_hall\``);
        await queryRunner.query(`DROP TABLE \`weeding_hall_pictures\``);
        await queryRunner.query(`DROP TABLE \`weeding_hall_number\``);
        await queryRunner.query(`DROP TABLE \`weeding_hall_custom_packages\``);
        await queryRunner.query(`DROP TABLE \`weeding_hall_seats_packages\``);
        await queryRunner.query(`DROP TABLE \`weeding_hall_meals_packages\``);
        await queryRunner.query(`DROP TABLE \`womens_atelier_pictures\``);
        await queryRunner.query(`DROP INDEX \`REL_e534651d4a7389ac0773dcc83d\` ON \`womens_atelier\``);
        await queryRunner.query(`DROP TABLE \`womens_atelier\``);
        await queryRunner.query(`DROP TABLE \`womens_atelier_products\``);
        await queryRunner.query(`DROP INDEX \`IDX_638bac731294171648258260ff\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`business_category\``);
        await queryRunner.query(`DROP TABLE \`womens_atelier_number\``);
    }

}
