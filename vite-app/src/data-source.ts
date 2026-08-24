// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "your_postgres_user",
    password: "your_postgres_password",
    database: "your_database_name",
    synchronize: true, // Set to false in production!
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
});
