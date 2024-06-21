import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const app = express();
import userRoutes from './routes/user.route.js'
import authRoute from './routes/authroute.js'
app.use(express.json());
mongoose.connect(process.env.MONGO).then(
    ()=>{
        console.log("Database is connected !")
        app.listen(5000, ()=>{
            console.log("Server is running at port 5000")
        })
    }
).catch((err)=>{
    console.log(err);
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoute);

