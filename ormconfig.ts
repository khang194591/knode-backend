import * as dotenv from 'dotenv';
import { DataSourceOptions } from "typeorm";

dotenv.config({ path: '../.env' });

declare global {
    // @ts-ignore
    type Nullable<T> = T | null
}

export const migrationConfig: DataSourceOptions = ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    dropSchema: false,
    migrationsRun: true,
    logging: true,
    entities: ['../src/**/*.entity.ts'],
    migrations: ['../migrations/**/*.ts'],
    migrationsTableName: '__migrations',
})

export const seedConfig: DataSourceOptions = ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    dropSchema: false,
    migrationsRun: true,
    logging: true,
    entities: ['../src/**/*.entity.ts'],
    migrations: ['../seeds/**/*.ts'],
    migrationsTableName: '__seeds',
})