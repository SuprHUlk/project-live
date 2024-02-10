import { Button, SnackbarCloseReason } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { signup } from "../services/auth-service";
import { useState } from "react";
import Alert from "../components/Alert";

interface Props {
  onSuccessfulSignup: () => void;
}

const Signup: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const { onSuccessfulSignup } = props;

  const handleusername = (e: any) => {
    setName(e.target.value);
  };
  const handlemail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlepassword = (e: any) => {
    setPassword(e.target.value);
  };

  const openSnackbar = (message: string) => {
    setMessage(message);
    setOpen(true);
  } 

  const handleClose = (event?: React.SyntheticEvent | Event , reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handlesignup = () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      !isValidEmail(email)
    ) {
      openSnackbar("Please fill all the fields with valid values");
      return;
    }

    signupCall({ username: name, email: email, password: password }).then((res) => {
      if (res.msg === "Signup successful") {
        reset();
        openSnackbar('Signup successful');
        onSuccessfulSignup();
      }
      else if (res.msg === "ValidationError"){
        openSnackbar("ValidationError: Email already exists");
      }
      else if(res.msg === "WeakPassword: Password length must be greater than 6 character"){
        openSnackbar("WeakPassword: Password length must be greater than 6 character");
      }
    });
  };

  const isValidEmail = (email: string) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signupCall = (signupData: { username: string, email: string, password: string}) => {
    return signup(signupData);
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
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
              onChange={handleusername}
              placeholder="Username"
              className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white"
              required
            ></input>
            <input
              value={email}
              type="email"
              placeholder="Email"
              onChange={handlemail}
              className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white"
              required
            ></input>
            <input
              value={password}
              type="password"
              placeholder="Password"
              onChange={handlepassword}
              className="h-[5vh] w-[100%] bg-transparent border-b-[2px] pl-5 text-white"
              required
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
          <Button
            variant="outlined"
            sx={{ width: "55%" }}
          >
            <FcGoogle className="mr-2 text-xl" />
            Sign Up with google
          </Button>
        </div>
      </div>
      <Alert open={open} handleClose={handleClose} message={message} />;
    </>
  );
}

export default Signup;
