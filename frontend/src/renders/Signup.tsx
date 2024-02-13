import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { signup, googleSignIn } from "../services/auth-service";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  onSuccessfulSignup: () => void;
  openAlert: (message: string) => void;
  togglePageLoading: () => void;
}

const Signup: React.FC<Props> = ({
  onSuccessfulSignup,
  openAlert,
  togglePageLoading,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      !isValidEmail(email)
    ) {
      openAlert("Please fill all the fields with valid values");
      return;
    }

    setLoading(true);

    signup({ username: name, email: email, password: password }).then((res) => {
      if (res.msg === "Signup successful") {
        openAlert("Signup successful: Please login");
        setLoading(false);
        onSuccessfulSignup();
        reset();
      } else if (res.msg === "ValidationError") {
        openAlert("ValidationError: Email already exists");
      } else if (
        res.msg ===
        "WeakPassword: Password length must be greater than 6 character"
      ) {
        openAlert(
          "WeakPassword: Password length must be greater than 6 character"
        );
      }
      setLoading(false);
    });
  };

  const handleGoogleSignup = () => {
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
    setName("");
    setEmail("");
    setPassword("");
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
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white"
              required
            ></input>
            <input
              value={email}
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white"
              required
            ></input>
            <input
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white"
              required
            ></input>
            <div className="w-[100%] flex justify-center items-center mt-2">
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={handleSignup}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "create an account"
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className="w-[100%] h-[10vh]  flex justify-center items-center relative ">
          <Button
            variant="outlined"
            sx={{ width: "55%" }}
            onClick={handleGoogleSignup}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <FcGoogle className="mr-2 text-xl" />
                Sign Up with google
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Signup;
