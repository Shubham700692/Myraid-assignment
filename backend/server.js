require("dotenv").config()

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")

connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
 origin: "https://myraid-assignment-4.onrender.com",
 credentials: true
}))

app.use("/api/auth",authRoutes)
app.use("/api/tasks",taskRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
 console.log(`Server running on ${PORT}`)
})