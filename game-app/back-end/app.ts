import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import gameRoute from './src/routes/gameRoutes'
import 'dotenv/config'

// middlewares
const app: Application = express()
app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send({ message: "It works..." })
})

app.use('/api/games', gameRoute)



export { app }