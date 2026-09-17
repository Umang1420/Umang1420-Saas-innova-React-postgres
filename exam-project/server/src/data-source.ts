import { DataSource } from 'typeorm'
import { Name } from './names/entities/name.entity.js'
import { Users } from './users/user.entity.js'
import { Message } from './messages/message.entity.js'

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Umang#2005",
    database: "Exam",
    entities: [ Name, Users, Message ],
    synchronize: true
})