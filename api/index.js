import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config();
const app = express();
import userRoutes from './routes/user.route.js'
import authRoute from './routes/authroute.js'
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO).then(
    ()=>{
        console.log("Database is connected !")
        app.listen(3000, ()=>{
            console.log("Server is running at port 3000")
        })
    }
).catch((err)=>{
    console.log(err);
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoute);


//middleware for error handeling
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        sucess:false,
        statusCode,
        message
    })

})