
import { Input, VStack, Text, Box, useToast, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../urls";
export default function SignupPage() {
  const toast = useToast() ;
  const [registerData, setRegisterData] = useState({ userName: "", email: "", pass: "", role: ""});
  const handleSignup = () => {
    console.log(registerData);
    axios
      .post(`${baseURL}/register`, registerData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // setRegisterData({ userName: "", email: "", pass: "", role: "" });
    toast({
      title: "Registered Successfully",
      description: "Registered Successfully",
      status: "success",
      duration: 1500,
      isClosable: true,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <VStack
        spacing={3}
        padding={4}
        border="1px solid black "
        borderRadius="10px"
        width="400px"
      >
        <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Text fontSize="20px">User Name :</Text>
        <Input
          placeholder="enter user name"
          size="16px"
          px="10px"
          borderRadius="5px"
          border="1px solid black"
          required
          value={registerData.userName}
          onChange={(e) =>
            setRegisterData({ ...registerData, userName: e.target.value })
          }
        />
        </Box>

        <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Text fontSize="20px">Email :</Text>
        <Input
          placeholder="enter email"
          size="16px"
          px="10px"
          borderRadius="5px"
          border="1px solid black"
          type="email"
          required
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
        />
        </Box>

        <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Text fontSize="20px">Password :</Text>
        <Input
          placeholder="password"
          size="16px"
          px="10px"
          borderRadius="5px"
          border="1px solid black"
          type="password"
          required
          value={registerData.pass}
          onChange={(e) =>
            setRegisterData({ ...registerData, pass: e.target.value })
          }
        />
        </Box>

        <Button color={"white"} backgroundColor={"blue"} transition={"all 0.3s ease"} _hover={{ transform: "scale(1.1)" }} onClick={handleSignup} >Signup</Button>

          

        <Link to={"/login"} >Already a user? Login </Link>
      </VStack>
    </div>
  );
}