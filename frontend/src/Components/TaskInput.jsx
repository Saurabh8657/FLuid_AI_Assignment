import axios from "axios";
import { useEffect, useState } from "react";

export default function TaskInput() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: new Date().toISOString().slice(0, 10),
    priority: "medium",
    status: "pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(task);
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080/tasks/add', // your API base URL
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem("token")}` // Set the Authorization header with the token
      }
    });
    axiosInstance
      .post("http://localhost:8080/tasks/add", task)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    
    window.location.reload();
  }

  useEffect(() => {

  }, [])
  return (
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px", border: "1px solid black", width: "350px", marginRight: "50px" }}>
        <h2>Add New Task</h2>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />

        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          placeholder="Enter task description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />

        <label htmlFor="dueDate">Due Date: </label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={(e) => {
            setTask({ ...task, dueDate: new Date(e.target.value).toISOString().slice(0, 10) });
            console.log(e) ;
          }}
          />

        <label htmlFor="priority">Priority: </label>
        <select
          name="priority"
          id="priority"
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label htmlFor="status">Status: </label>
        <select
          name="status"
          id="status"
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input style={{ backgroundColor: "blue", color: "white", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer" }} type="submit" value={"Add Task"} />
      </form>
  );
}
