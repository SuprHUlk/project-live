import { Button } from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
function Login() {
  return (
    <>
      <div className="w-[40%] h-[80vh]  absolute top-[20vh] right-[5%]">
        <div className="text-white w-[100%] h-[10vh] flex justify-center items-center text-3xl font-bold">
          Welcome to Project Live
        </div>
        <div className="w-[100%] h-[40vh]  flex justify-center items-center relative top-[1vh]">
          <form className="w-[55%] h-[30vh]  flex flex-col gap-8 ">
            <input
              placeholder="Email"
              className="h-[5vh] bg-transparent border-b-[2px] pl-5 text-white"
            ></input>
            <input
              placeholder="Password"
              className="h-[5vh] bg-transparent border-b-[2px] pl-5 text-white"
            ></input>
            <div className="w-[100%] flex justify-center items-center">
              <Button variant="contained" sx={{ width: "100%" }}>
                Log In
              </Button>
            </div>
            <hr />
          </form>
        </div>
        <div className="w-[100%] flex justify-center items-center relative bottom-5">
          <Button variant="outlined" sx={{ width: "55%" }}>
            <FcGoogle className="mr-2 text-xl" />
            Log In with google
          </Button>
        </div>
      </div>
    </>
  );
}
export default Login;
