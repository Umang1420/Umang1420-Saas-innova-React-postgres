
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());


const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, 
    entities: [], 
});

AppDataSource.initialize()
    .then(() => console.log("Database connected!"))
    .catch((err) => console.error("Database error:", err));


app.get("/api/data", async (req, res) => {

    res.json({ message: "Hello from the PostgreSQL backend!" });
});

app.get("/", (req, res) => {
    res.send("Backend server is running smoothly and database is connected!");
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
