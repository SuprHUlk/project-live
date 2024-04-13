import Navbar from "./Navbar";

import Sidebar from "../renders/Dashboard_structure/Sidebar";
export default function Test() {
  return (
    <>
      <Navbar />
      <div
        className="w-[100%] h-[100vh] flex justify-between items-center bg-[#0E0E10] text-white"
        id="mainbg"
      >
        <Sidebar openAlert={opener} />
      </div>
    </>
  );
}
