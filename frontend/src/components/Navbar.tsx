import { CiUser, CiLogout, CiSettings } from "react-icons/ci";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import Login from "../renders/Login";
import Signup from "../renders/Signup";
function Navbar() {
  const location = useLocation(); // Get the current location
  const isDashboard = location.pathname === "/dashboard";

  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Set to true initially
  const [showSignup, setShowSignup] = useState(false);

  const showmenubtn = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const toggle = () => {
    if (showLogin) {
      setShowSignup(true);
      setShowLogin(false);
    } else {
      setShowLogin(true);
      setShowSignup(false);
    }
  };

  return (
    <>
      <div className="w-[100%] h-[8vh] bg-[#18181B] absolute top-0 flex justify-between items-center shadow-md shadow-black">
        <div className="text-white font-bold w-[20%] h-[8vh] flex justify-between items-center pl-7">
          PROJECT LIVE
        </div>
        <div className="w-[20%] h-[8vh]  flex justify-center items-center  ">
          <div className="w-[50%] h-[8vh] flex justify-center items-center gap-3">
            {!isDashboard && (
              <button
                className="w-[50%] h-8 bg-[#2F2F35] rounded-md text-white shadow-2xl border-[1px] border-black hover:bg-[#414146]"
                onClick={toggle}
              >
                Log In
              </button>
            )}
            {!isDashboard && (
              <button
                className="w-[50%] h-8 bg-blue-600 rounded-md text-white shadow-2xl border-[1px] border-black hover:bg-blue-800"
                onClick={toggle}
              >
                Sign Up
              </button>
            )}
          </div>
          <div className="w-[20%] h-[8vh] flex justify-center items-center  ">
            <button
              className="w-[80%] h-[5vh] flex justify-center items-center rounded-md hover:bg-[#2F2F35]"
              onClick={showmenubtn}
            >
              <CiUser className="text-white text-2xl" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`w-[10%] h-max bg-[#2F2F35] shadow-lg shadow-black  absolute top-[9vh] right-[1%] ${
          isMenuVisible ? "" : "hidden"
        }`}
      >
        {isDashboard && (
          <button className="text-white flex justify-start items-center w-[100%] h-[5vh] border-b-[1px] border-gray-600 hover:bg-slate-700">
            <CiUser className="m-2 text-xl" /> Profile
          </button>
        )}
        {isDashboard && (
          <button className="text-white flex justify-start items-center w-[100%] h-[5vh] border-b-[1px] border-gray-600 hover:bg-slate-700">
            <CiSettings className="m-2 text-xl" /> Settings
          </button>
        )}
        {isDashboard && (
          <button className="text-white flex justify-start items-center w-[100%] h-[5vh] hover:bg-slate-700">
            <CiLogout className="m-2 text-xl" /> Logout
          </button>
        )}
      </div>
      {showLogin && !isDashboard && <Login />}
      {showSignup && !isDashboard && <Signup onSuccessfulSignup={toggle} />}
    </>
  );
}

export default Navbar;
