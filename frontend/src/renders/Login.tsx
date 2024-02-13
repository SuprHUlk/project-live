import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { login, googleSignIn } from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

interface Props {
  openAlert: (message: string) => void;
  togglePageLoading: () => void;
}

const Login: React.FC<Props> = ({ openAlert, togglePageLoading }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (email.trim() === "" || !isValidEmail(email)) {
      openAlert("Please fill all the fields with valid values");
      return;
    }

    setLoading(true);

    login({ email: email, password: password }).then(async (res) => {
      if (res.msg === "Login successful") {
        await onSuccessfulLogin(res.idToken, res.username);
      } else if (res.msg === "InvalidCredentials: Invalid email or password") {
        openAlert("InvalidCredentials: Invalid email or password");
      } else {
        openAlert("UnknownError: Try again");
      }
      setLoading(false);
    });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    googleSignIn().then(async (res) => {
      if (res.msg === "Login successful") {
        await onSuccessfulLogin(res.idToken, res.username);
      } else {
        openAlert("UnknownError: Try again");
      }
    });
  };

  const onSuccessfulLogin = async (idToken: string, username: string) => {
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("username", username);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    togglePageLoading();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("/dashboard");
    openAlert("Login successful");
    reset();
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
    <>
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
              onChange={(e) => setEmail(e.target.value)}
              className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white mt-3 focus:outline-none"
            ></input>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
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
        <div className="w-[100%] h-[10vh]  flex justify-center items-center relative">
          <Button
            variant="outlined"
            sx={{ width: "55%" }}
            onClick={handleGoogleSignIn}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <FcGoogle className="mr-2 text-xl" />
                Log In with google
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
