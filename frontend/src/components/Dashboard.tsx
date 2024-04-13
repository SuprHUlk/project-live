import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "../renders/Dashboard_structure/Sidebar";
import SelectCat from "../renders/Dashboard_structure/SelectCat";
import Irlshow from "../renders/showcad/Irlshow";
import Gameshow from "../renders/showcad/gameshow";
import Othershow from "../renders/showcad/othershow";

interface Props {
  openAlert: (message: string, isDanger: boolean) => void;
}

function Dashboard({ openAlert }: Props) {
  const [activeComponent, setActiveComponent] = useState("SelectCat");

  const handleButtonClick = (componentName: string) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <Navbar />
      <div
        className="w-[100%] h-[100vh] flex justify-between items-center bg-[#0E0E10] text-white"
        id="mainbg"
      >
        <Sidebar openAlert={openAlert} />
        {activeComponent === "SelectCat" && (
          <SelectCat handleButtonClick={handleButtonClick} />
        )}
        {activeComponent === "Irlshow" && <Irlshow openAlert={openAlert} />}
        {activeComponent === "Gameshow" && <Gameshow openAlert={openAlert} />}
        {activeComponent === "Othershow" && <Othershow openAlert={openAlert} />}
      </div>
    </>
  );
}

export default Dashboard;
