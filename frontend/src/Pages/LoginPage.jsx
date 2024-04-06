import { Input, VStack, Text, Box, Button } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL, usersURL } from "../urls";
export default function LoginPage() {
  const [ loginData, setLoginData ] = useState({email: "", pass: ""})
  const toast = useToast()
  const navigate = useNavigate() ;
  const handleLogin = () => {
    console.log(loginData)
    axios.post(`${usersURL}/login`, loginData)
    .then(res => {
      console.log(res)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
    })
    .catch(err => console.log(err))
    toast({
      title: "Login Successful",
      description: "Welcome back!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate("/")
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <VStack spacing={3} padding={4} border="1px solid black " borderRadius="10px" width="400px">
        <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Text fontSize='20px'>Email :</Text>
        <Input placeholder="email" size="16px" px="10px" borderRadius="5px" border="1px solid black"
          type="email"
          required
          value={loginData.email}
          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
        />
        </Box>

        <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Text fontSize='20px'>Password :</Text>
        <Input placeholder="password" size="16px" px="10px" borderRadius="5px" border="1px solid black"
          type="password"
          required
          value={loginData.pass}
          onChange={(e) => setLoginData({...loginData, pass: e.target.value})}  
        />
        </Box>


        <Button color={"white"} backgroundColor={"blue"} transition={"all 0.3s ease"} _hover={{ transform: "scale(1.1)" }} onClick={handleLogin} >Login</Button>

        <Link to={"/signup"} >Not Registered? Signup </Link>
      </VStack>
    </div>
  );
}