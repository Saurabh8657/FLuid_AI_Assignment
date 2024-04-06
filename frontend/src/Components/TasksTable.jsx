import { useEffect, useState } from 'react'
import axios from "axios";
import TaskCard from "../Components/TaskCard";

const tableheadStyle = {
    padding: "12px",
    textAlign: "left",
    border: "1px solid #ddd",
    backgroundColor: "#4caf50",
    color: "white",
  };

export default function TasksTable() {
    
  const [taskList, setTaskList] = useState([]) ;
  const [ token, setToken ] = useState("");

  const initialFetch = () => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080/tasks', // your API base URL
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem("token")}` // Set the Authorization header with the token
      }
    });
    axiosInstance
      .get(`http://localhost:8080/tasks/`)
      .then((res) => {
        console.log(res);
          setTaskList(res.data.tasks);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setToken(localStorage.getItem("token")) 
    initialFetch();
    console.log(token)
  }, []);
  return (
    <>
    { <table
            style={{
              width: "50%",
              marginBottom: "20px",
              backgroundColor: "#f9f9f9",
              border: "1px solid black",
            }}
          >
            <thead style={{ backgroundColor: "#3498db", color: "white" }}>
              <tr style={{ height: "20px" }}>
                <th style={tableheadStyle}>Title</th>
                <th style={tableheadStyle}>Description</th>
                <th style={tableheadStyle}>Due Date</th>
                <th style={tableheadStyle}>Priority</th>
                <th style={tableheadStyle}>Status</th>
                <th style={tableheadStyle}>Archive</th>
              </tr>
            </thead>
            <tbody>
              {taskList.length === 0 ? (
                <tr style={{ textAlign: "center", marginTop: "200px" }}>
                 <td>You have no tasks.</td> 
                </tr>
              ) : (
                taskList?.map((item) => <TaskCard key={item._id} item={item} />)
              )}
            </tbody>
          </table>
        }
        </>
  )
}
