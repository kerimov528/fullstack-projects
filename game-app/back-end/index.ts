import mongoose from "mongoose";
import { app } from './app'

const port: string | undefined = process.env.PORT

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSEDB_URL!)
        console.log('Connected to db ... ')
        app.listen(5000, () => console.log('Server listening on port...'))
    }
    catch (error) {
        console.log('Failed to connect ...')
        console.log('Error', error)
    }
}

// crypto 
// fs
// http 
// dotenv 

startServer()