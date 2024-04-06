const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/user.route');
const { connectionDB } = require('./config/db');
const { taskRouter } = require('./routes/task.route');
const PORT = 8080;



//initializing the app
const app = express();



//middlewares
app.use(express.json());
app.use(express.text());
app.use(cors());
app.use('/users', userRouter);
app.use('/tasks', taskRouter);



//routes
app.get('/', (req, res) => {
    res.status(200).json({msg: 'Welcome to the backend od Task Manager App'})
})






//listening to the port
app.listen(PORT, async () => {
    try{
        await connectionDB;
        console.log(`Listening on port ${PORT}`);
        console.log(`Database connected successfully`);
    }
    catch(err){
        console.log(err);
    }
})