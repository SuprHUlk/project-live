import Navbar from "./Navbar";

import bg from "../assets/plive.jpg";
import i1 from "../assets/1.png";
import i2 from "../assets/2.png";
import i3 from "../assets/3.png";
import Login from "../renders/Login";
import Signup from "../renders/Signup";
import { useState } from "react";

import Loading from "../components/Loading";

interface SomeComponentProps {
  openAlert: (message: string, isDanger: boolean) => void;
}

const Auth: React.FC<SomeComponentProps> = ({ openAlert }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const toggle = (app: string) => {
    if (app === "login") {
      setShowLogin(true);
      setShowSignup(false);
    } else {
      setShowSignup(true);
      setShowLogin(false);
    }
  };

  return (
    <>
      {showLoading && <Loading />}
      {!showLoading && (
        <>
          <Navbar toggleForm={toggle} />
          <div
            className="w-[100%] h-[100vh] flex justify-between items-center bg-[#0E0E10] text-white"
            id="mainbg"
          >
            <div className="">
              <img src={i1} className="absolute top-[65vh] left-[10%] z-10" />
              <img src={i2} className="absolute top-[50vh] left-[40%] z-20" />
              <img src={i3} className="absolute top-[25vh] left-[5%] z-10" />
              <img
                src={bg}
                className="w-[40%] absolute top-[30vh] left-[10%]"
              />
            </div>
          </div>
          {showLogin && (
            <Login
              openAlert={openAlert}
              togglePageLoading={() => setShowLoading(true)}
            />
          )}
          {showSignup && (
            <Signup
              onSuccessfulSignup={() => toggle("login")}
              openAlert={openAlert}
              togglePageLoading={() => setShowLoading(true)}
            />
          )}
        </>
      )}
    </>
  );
};

export default Auth;
