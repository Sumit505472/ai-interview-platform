import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "../src/routes/auth.routes.js"
import resumeRoutes from "../src/routes/resume.routes.js"
import DBConnection from "./config/db.js"


dotenv.config()
const app=express()

app.use(express.json())
app.use(cookieParser())
DBConnection()


app.get("/",()=>{
    res.send("Ai interview Platform is running")

})

//routes
app.use("/api/auth", authRoutes)
app.use("/api/resume", resumeRoutes)

app.use((error, _req, res, _next) => {
    if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ success: false, message: "Resume file must be 5 MB or smaller" })
    }

    if (error.message === "Only PDF files are allowed" || error.code?.startsWith("LIMIT_")) {
        return res.status(400).json({ success: false, message: error.message })
    }

    console.error("Request failed:", error)
    return res.status(500).json({ success: false, message: "Internal server error" })
})

export default app;

