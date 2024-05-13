import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const dataSourseOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'springstudent',
  password: 'springstudent',
  database: 'weeding',
  logging: true,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: false,
};

export const dataSource = new DataSource(dataSourseOptions);
