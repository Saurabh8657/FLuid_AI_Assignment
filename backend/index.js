const express = require("express");
const cors = require("cors")
const { connectDB } = require("./db");
const { userRouter } = require("./routes/user.router");
const { tasksRouter } = require("./routes/tasks.router");

const app = express();
app.use(cors())
app.use(express.json()) ;
app.use(express.text()) ;
app.use("/users", userRouter) ;
app.use("/tasks", tasksRouter) ;

app.get("/", (req, res) => {
    res.status(200).send("Hello World")
})


const PORT = 8080;
app.listen(PORT, async () => {
    try {
        await connectDB;
        console.log("Connected to DB")
        console.log(`Server is running on ` + `http://localhost:8080`)
    } catch (error) {
        console.log(error)
    }
})