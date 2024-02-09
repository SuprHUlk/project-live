import { CiUser } from "react-icons/ci";
import { useState } from "react";
function Navbar() {
  // Show menu Function Here
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const showmenubtn = () => {
    setMenuVisibility(!isMenuVisible);
  };

  return (
    <>
      <div className="w-[100%] h-[8vh] bg-[#18181B] absolute top-0 flex justify-between items-center shadow-md shadow-black">
        <div className="text-white font-bold w-[20%] h-[8vh] flex justify-between items-center pl-7">
          PROJECT LIVE
        </div>
        <div className="w-[20%] h-[8vh]  flex justify-center gap-4 items-center ">
          <button className="w-[25%] h-8 bg-[#2F2F35] rounded-md text-white shadow-2xl border-[1px] border-black hover:bg-[#414146]">
            Log In
          </button>
          <button className="w-[25%] h-8 bg-blue-600 rounded-md text-white shadow-2xl border-[1px] border-black hover:bg-blue-800">
            Sign Up
          </button>
          <button
            className="w-[10%] h-8 flex justify-center items-center rounded-md hover:bg-[#2F2F35]"
            onClick={showmenubtn}
          >
            <CiUser className="text-white text-2xl" />
          </button>
        </div>
      </div>

      <div
        className={`w-[10%] h-max bg-[#2F2F35] shadow-lg shadow-black rounded-lg  absolute top-[9vh] right-[1%] ${
          isMenuVisible ? "" : "hidden"
        }`}
      >
        {/*  Here menu tab is added */}
      </div>
    </>
  );
}
export default Navbar;
