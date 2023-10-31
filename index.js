import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbconfig.js";
import userrouter from "./Routers/user.router.js";
const app = express();
dotenv.config()
const port= process.env.PORT

app.use(cors())
connectDB();
app.use((express.json()))
app.use('/api',userrouter)
app.listen(port,()=>{
 console.log("my app is listening",port);
})
