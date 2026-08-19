import express from "express"
import dotenv from "dotenv"
import authRoutes from "../src/routes/auth.routes.js"


dotenv.config()
const app=express()

app.use(express.json())


app.get("/",()=>{
    res.send("Ai interview Platform is running")

})

//routes
app.use("api/auth",authRoutes)

export default app;

