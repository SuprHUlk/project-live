import { Button, SnackbarCloseReason } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { login } from "../services/auth-service";
import { googleSignIn } from "../services/auth-service";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import httpInterceptor from "../shared/httpInterceptor";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const openAlert = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (email.trim() === "" || !isValidEmail(email)) {
      openAlert("Please fill all the fields with valid values");
      return;
    }

    loginCall({ email: email, password: password }).then(async (res) => {
      if (res.msg === "Login successful") {
        localStorage.setItem("idToken", res.idToken);
        localStorage.setItem("username", res.username);
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate("/loading");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate("/dashboard");

        reset();
      } else if (res.msg === "InvalidCredentials: Invalid email or password") {
        openAlert("InvalidCredentials: Invalid email or password");
      } else {
        openAlert("UnknownError: Try again");
      }
    });
  };

  const onGoogleSignIn = () => {
    googleSignIn().then(async (res) => {

      if(res.msg === "Login successful") {
        localStorage.setItem('idToken', res.idToken);
        localStorage.setItem('username', res.username);
        navigate("/loading");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate("/dashboard");
      }
      else {
        openAlert("UnknownError: Try again");
      }
    })
      
  } 

  const loginCall = (loginData: {email: string, password: string}) => {
    return login(loginData);
  };

  const isValidEmail = (email: string) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-[40%] h-[80vh]  absolute top-[20vh] right-[5%]">
      <div className="text-white w-[100%] h-[10vh] flex justify-center items-center text-3xl font-bold">
        Welcome to Project Live
      </div>
      <div className="w-[100%] h-[30vh] flex justify-center items-center relative top-[1vh] ">
        <form className="w-[55%] h-[30vh]  flex flex-col gap-2 justify-center items-center border-b-[1px] ">
          <input
            required
            value={email}
            type="email"
            placeholder="Email"
            onChange={handleEmail}
            className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white mt-3 focus:outline-none"
          ></input>
          <input
            required
            value={password}
            onChange={handlePassword}
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
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log In"
              )}
            </Button>
          </div>
        </form>
      </div>
      <div className="w-[100%] h-[10vh]  flex justify-center items-center relative ">
        <Button variant="outlined" sx={{ width: "55%" }} onClick={onGoogleSignIn}>
          <FcGoogle className="mr-2 text-xl" />
          Log In with google
        </Button>
      </div>
      <Alert open={open} handleClose={handleClose} message={message} />
    </div>
  );
}

export default Login;
