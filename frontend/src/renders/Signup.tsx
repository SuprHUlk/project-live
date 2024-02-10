import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { signup } from "../services/auth-service";
import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleusername = (e: any) => {
    setName(e.target.value);
  };
  const handlemail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlepassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handlesignup = () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      !isValidEmail(email)
    ) {
      console.log("Error in the field");
      return;
    }

    console.log("Username: ", name);
    console.log("Email: ", email);
    console.log("Password: ", password);

    chng({username: name, email: email, password: password})
      .then(res=>{
        if(res.msg === 'Signup successful') {
          
        }
      })
  };

  const isValidEmail = (email: string) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const chng = (signupData: {username: string, email: string, password: string}) => {
    return signup(signupData)
  };

  return (
    <>
      <div className="w-[40%] h-[80vh]  absolute top-[20vh] right-[5%]">
        <div className="text-white w-[100%] h-[10vh] flex justify-center items-center text-3xl font-bold">
          Welcome to Project Live
        </div>
        <div className="w-[100%] h-[30vh]  flex justify-center items-center relative top-[1vh] ">
          <form className="w-[55%] h-[30vh]  flex flex-col gap-3 justify-center items-center border-b-[1px] ">
            <input
              type="text"
              onChange={handleusername}
              placeholder="Username"
              className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white"
            ></input>
            <input
              type="email"
              placeholder="Email"
              onChange={handlemail}
              className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white"
            ></input>
            <input
              type="password"
              placeholder="Password"
              onChange={handlepassword}
              className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white"
            ></input>
            <div className="w-[100%] flex justify-center items-center mt-2">
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={handlesignup}
              >
                Create an Account
              </Button>
            </div>
          </form>
        </div>
        <div className="w-[100%] h-[10vh]  flex justify-center items-center relative ">
          <Button variant="outlined" sx={{ width: "55%" }} onClick={handlesignup}>
            <FcGoogle className="mr-2 text-xl" />
            Sign Up with google
          </Button>
        </div>
      </div>
    </>
  );
}

export default Signup;
