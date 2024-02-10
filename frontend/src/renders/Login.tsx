import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Alert from "../components/Alert";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleemail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlepassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (email.trim() === "" || !isValidEmail(email)) {
      console.log("Error in the field");
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);
  };

  const isValidEmail = (email: string) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="w-[40%] h-[80vh]  absolute top-[20vh] right-[5%]">
        <div className="text-white w-[100%] h-[10vh] flex justify-center items-center text-3xl font-bold">
          Welcome to Project Live
        </div>
        <div className="w-[100%] h-[30vh] flex justify-center items-center relative top-[1vh] ">
          <form className="w-[55%] h-[30vh]  flex flex-col gap-2 justify-center items-center border-b-[1px] ">
            <input
              required
              type="email"
              placeholder="Email"
              onChange={handleemail}
              className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white mt-3 focus:outline-none"
            ></input>
            <input
              required
              onChange={handlepassword}
              placeholder="Password"
              type="password"
              className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white mt-3 focus:outline-none"
            ></input>
            <div className="w-[100%] flex justify-center items-center mt-[5vh]">
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={handleLogin}
              >
                Log In
              </Button>
            </div>
          </form>
        </div>
        <div className="w-[100%] h-[10vh]  flex justify-center items-center relative ">
          <Button variant="outlined" sx={{ width: "55%" }}>
            <FcGoogle className="mr-2 text-xl" />
            Log In with google
          </Button>
        </div>
      </div>
      <Alert message="HEllo" />
    </>
  );
}

export default Login;
