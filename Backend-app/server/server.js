import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entitiy/user.ts"

const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Umang#2005",
    database: "firstdb",
    entities: [User],
    synchronize: true,
})

try {
    await PostgresDataSource.initialize()
    console.log("Data Source has been initialized!")
} catch (error) {
    console.error("Error during Data Source initialization", error)
}