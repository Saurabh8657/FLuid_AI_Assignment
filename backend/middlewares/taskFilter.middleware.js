import { TaskModel } from "../model/task.model";


const taskFilter = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const filterdTasks = await TaskModel.find({userId}) ;
    } catch (error) {
        res.status(500).json({"Internal Server Error": error});
    }
}
