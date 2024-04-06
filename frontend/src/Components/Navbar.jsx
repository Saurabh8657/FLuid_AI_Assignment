import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <div style={{backgroundColor:"#0096FF",  display:"flex", justifyContent:"space-around", padding:"10px", fontSize:"20px", fontWeight:"600", color:"white"}}>
        <Link to={"/"} > Home </Link>
        <Link to={"/login"} > Login </Link>
    </div>
  )
}



