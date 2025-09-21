import express, { urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { ok } from "assert";

dotenv.config()

const app = express()
app.use(helmet())

app.use(cors({
    origin : process.env.FRONTEND || "http://localhost:5006",
    credentials: true
}))

const limit = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 100,  
    message: "Too many requests"
})

app.use(limit)

app.use(express.json({limit : "10mb"}))
app.use(express.urlencoded({extended : true}))

app.get("/health",(req, res) =>{
    res.status(200).json({status:"ok"})
})

app.get("/", (req, res) =>{
    res.json({message:"authserviceAPI"})
})



export default app;