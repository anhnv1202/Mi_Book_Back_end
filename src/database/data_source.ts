import { Config } from '@config/common.config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
const AppDataSource = new DataSource({
  type: 'mysql',
  host: Config.DATABASE_HOST ?? '127.0.0.1',
  port: Config.DATABASE_PORT,
  username: Config.DATABASE_USERNAME ?? 'root',
  password: Config.DATABASE_PASSWORD,
  database: Config.DATABASE_NAME,
  synchronize: false,
  logging: true,
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
  migrations: ['build/migrations/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*.ts'],
});
export default AppDataSource;
