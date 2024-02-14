import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "../renders/Setting_structure/Sidebar";
import Profilemenu from "../renders/Setting_structure/Profilemenu";
import Streammenu from "../renders/Setting_structure/Streammenu";

export default function Setting() {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menu: any) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <Navbar />
      <div className="w-[100%] h-[100vh] bg-[#0E0E10] ">
        <Sidebar onMenuClick={handleMenuClick} />
        {selectedMenu === "profile" && <Profilemenu />}
        {selectedMenu === "stream" && <Streammenu />}
      </div>
    </>
  );
}
