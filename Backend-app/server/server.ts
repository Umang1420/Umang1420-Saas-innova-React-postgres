import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usere, Product } from "../entity/user.js"
import express from "express"
import { type Request, type Response } from "express"


const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Umang#2005",
    database: "firstdb",
    entities: [Usere, Product],
    synchronize: true,
})

try {
    await PostgresDataSource.initialize()
    console.log("Data Source has been initialized!")
} catch (error) {
    console.error("Error during Data Source initialization", error)
}
const userRepository = PostgresDataSource.getRepository(Usere)
const productRepository = PostgresDataSource.getRepository(Product)


const app = express()
app.use(express.json())


app.get("/", async (req: Request, res: Response) => {
    res.send("hello")
})



app.get("/users", async (req: Request, res: Response) => {
    const users = await userRepository.find()
    res.json(users)
})
app.get("/product", async (req: Request, res: Response) => {
    const product = await productRepository.find()
    res.json(product)
})


app.get("/users/:id", async (req: Request, res: Response) => {
    const user = await userRepository.findOneBy({ id: Number(req.params.id) })
    res.json(user)
})
app.get("/product/:id", async (req: Request, res: Response) => {
    const product = await productRepository.findOneBy({ id: Number(req.params.id) })
    res.json(product)
})


app.post("/users", async (req: Request, res: Response) => {
     console.log("Request body:", req.body)
    const user = userRepository.create(req.body)
    const result = await userRepository.save(user)
    res.json(result)
})

app.post("/product", async (req: Request, res: Response) => {
    const { title, price, description, isActive, userId } = req.body

    const user = await userRepository.findOneBy({ id: userId })

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    const product = productRepository.create({
        title,
        price,
        description,
        isActive,
        User: [user],
    })

    const result = await productRepository.save(product)
    res.json(result)
})

app.put("/users/:id", async (req: Request, res: Response) => {
    await userRepository.update(Number(req.params.id), req.body)
    const updatedUser = await userRepository.findOneBy({ id: Number(req.params.id) })
    res.json(updatedUser)
})


app.delete("/users/:id", async (req: Request, res: Response) => {
    await userRepository.delete(Number(req.params.id))
    res.json({ message: "User deleted" })
})


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})