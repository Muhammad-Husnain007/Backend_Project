import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

app.use(cors({
    origion: process.env.CORS_ORIGION,
    credentials: true
}));
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

            // Import Routes
import userRouter from './routes/user.route.js'

app.use("/api/v1/users", userRouter)



export { app }