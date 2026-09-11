import "reflect-metadata"
import { DataSource } from "typeorm"
import { User2 } from "../entity/user.js"
import express from "express"
import { type Request, type Response } from "express"
import cors from "cors"


const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Umang#2005",
    database: "firstdb",
    entities: [User2],
    synchronize: true,
})

try {
    await PostgresDataSource.initialize()
    console.log("Data Source has been initialized!")
} catch (error) {
    console.error("Error during Data Source initialization", error)
}

const userRepository = PostgresDataSource.getRepository(User2)



const app = express()
app.use(cors());
app.use(express.json())


app.get("/", async (req: Request, res: Response) => {
    res.send("hello")
})



app.get("/users", async (req: Request, res: Response) => {
    const users = await userRepository.find({order:{
        id : "ASC"
    }})
    res.json(users)
})


app.get("/users/:id", async (req: Request, res: Response) => {
    const user = await userRepository.findOneBy({ id: Number(req.params.id) })
    res.json(user)
})


app.post("/users", async (req: Request, res: Response) => {
     console.log("Request body:", req.body)
    const user = userRepository.create(req.body)
    const result = await userRepository.save(user)
    res.json(result)
})



app.patch("/users/:id", async (req: Request, res: Response) => {
    //First way

    // await userRepository.update(Number(req.params.id), req.body)
    // const updatedUser = await userRepository.findOneBy({ id: Number(req.params.id) })      
    // res.json(updatedUser)

    //Second way

    // const userId = Number(req.params.id)

    // if (!Number.isInteger(userId)) {
    //     return res.status(400).json({ message: "Invalid user id" })
    // }

    // const existingUser = await userRepository.findOneBy({ id: userId })

    // if (!existingUser) {
    //     return res.status(404).json({ message: "User not found" })
    // }

    // const updatedUser = await userRepository.save({
    //     ...existingUser,
    //     ...req.body,
    //     id: userId,
    // })

    // res.json(updatedUser)

    // 3rd Way

    const userId = Number(req.params.id)
    const user = await userRepository.findOneBy({id: userId})
    if(!user) return res.status(404).json({message:"User not found"});
    userRepository.merge(user,req.body);
    const result = await userRepository.save(user)
    res.json(result)
})



app.delete("/users/:id", async (req: Request, res: Response) => {
    const result = await userRepository.delete(Number(req.params.id))
    if(result.affected === 0) return res.status(404).json({message : "User not found"})
    res.json({ message: "User deleted" })
})


app.listen(5000, () => {
    console.log("Server running on http://localhost:5000")
})

