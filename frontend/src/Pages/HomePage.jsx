import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TasksPage from "./TasksPage";
import {  Button } from "@chakra-ui/react";

export default function HomePage() {
  const [displayTasks, setDisplayTasks] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedInUser({});
    setDisplayTasks(true);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")) ;
    if (token && user) {
      setLoggedInUser(user) ;
      setDisplayTasks(false);
    } 
  },[displayTasks])
  return (
    <>
    {
      loggedInUser.userName && 
      <div style={{ display: "flex", flexDirection: "row", gap: "20px", margin: "auto", width: "90%", padding: "5px", justifyContent: "center" }}>
        <h2 style={{textAlign:"center", marginTop:"0px", marginBottom:"-20px"}}>Hello {loggedInUser.userName}</h2> 
        <Button color={"white"} backgroundColor={"blue"} transition={"all 0.3s ease"} _hover={{ transform: "scale(1.1)" }} onClick={handleLogout} >Logout</Button>
      </div>
    }
    <h2 style={{textAlign:"center", marginTop:"10px"}}>Welcome to Fluid Ai Assignment</h2>
    {
      displayTasks ? <h3 style={{textAlign:"center", marginTop:"-30px"}}>Please Login to view your Tasks <Link to={"/login"} >Login </Link></h3> : <TasksPage />
    }
    </>
  )
}
