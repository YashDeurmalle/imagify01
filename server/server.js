import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import path from 'path'

const PORT = process.env.PORT || 4000
const App = express()

const _dirname = path.resolve();

App.use(express.json())
App.use(cors())
await connectDB()

App.use('/api/user', userRouter);
App.use('/api/image', imageRouter);

// App.get('/', (req,res) => res.send("API Working"));

App.use(express.static(path.join(_dirname, "/client/dist")))
App.get('*',(_,res) =>{
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
})

App.listen(PORT,() => console.log(`Server running on ${PORT}`));