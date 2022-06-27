import * as dbTablesIndex from '@libs/app-entities';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Get DynamicList Of Entities for import
const entities = (Object.keys(dbTablesIndex) as Array<keyof typeof dbTablesIndex>).map(
  (entity: keyof typeof dbTablesIndex) => dbTablesIndex[entity],
);

export const DbConnectionDetails = {
  type: 'mysql',
  host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : '127.0.0.1',
  port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306,
  username: process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME : 'root',
  password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : '',
  database: process.env.DATABASE_NAME ? process.env.DATABASE_NAME : 'firequiz',
  entities,
  synchronize: false,
  autoLoadEntities: true,
} as TypeOrmModuleOptions;
