import axios from "axios";
import { useEffect, useState } from "react";
const tablebodyStyle = {
    padding: "8px",
    border: "1px solid #ddd",
    textAlign: "left",
}
const TaskCard = ({ item }) => {
    const [ task, setTask ] = useState(item) ;
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/tasks/', // your API base URL
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem("token")}` // Set the Authorization header with the token
        }
      });
    const handleDelete = () => {
        axiosInstance.delete(`http://localhost:8080/tasks/delete/${task._id}`)
        .then(res => {
          console.log(res) ;
        })
        .catch(err => {
          console.log(err) ;
        })
        window.location.reload();
    };
    const handlePriorityChange = () => {
        if(task.priority === "low") task.priority = "medium"
        else if(task.priority === "medium") task.priority = "high"
        else task.priority = "low"
        axiosInstance.patch(`http://localhost:8080/tasks/update/${task._id}`, task)
        .then(res => {
          console.log(res) ;
        })
        .catch(err => {
            console.log(err) ;
        })
        window.location.reload();
    }
    const handleStatusChange = () => {
        if(task.status === "pending") task.status = "inProgress"
        else if(task.status === "inProgress") task.status = "completed"
        else task.status = "pending"
        axiosInstance.patch(`http://localhost:8080/tasks/update/${task._id}`, task)
        .then(res => {
          console.log(res) ;
        })
        .catch(err => {
            console.log(err) ;
        })
        window.location.reload();
    }
    useEffect( () => {}, [task])

    return (
        <tr style={{maxHeight: "30px"}}>
            <td style={tablebodyStyle}>{task.title}</td>
            <td style={tablebodyStyle}>{task.description}</td>
            <td style={tablebodyStyle}>{task.dueDate}</td>
            <td style={tablebodyStyle}><button style={{ backgroundColor: "blue" }} onClick={handlePriorityChange}>{task.priority} </button></td>
            <td style={tablebodyStyle}><button style={{ backgroundColor: "green" }} onClick={handleStatusChange}> {task.status}</button></td>
            <td style={tablebodyStyle}>
                <button style={{ backgroundColor: "red" }} onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default TaskCard;
