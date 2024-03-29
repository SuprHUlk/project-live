import { CiGrid31, CiStreamOn, CiUser } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
interface SidebarProps {
  onMenuClick: (menu: string) => void;
}
export default function Sidebar({ onMenuClick }: SidebarProps) {
  return (
    <>
      <div className="w-[18%] h-[92vh] absolute top-[8vh] bg-[#222225] shadow-md overflow-y-auto overflow-x-hidden showhide">
        <div className="w-[100%] h-[10vh] text-[#B0B7B0]  pl-[5%] flex justify-start items-center font-bold">
          <CiGrid31 className="text-blue-500 mr-[5%] text-3xl" /> Project Live
          Dashboard
        </div>
        <Button
          sx={{ width: "100%", height: "10vh", color: "white" }}
          onClick={() => onMenuClick("stream")}
        >
          <CiStreamOn className=" mr-[5%] text-3xl" />
          Stream
        </Button>
        <Button
          sx={{ width: "100%", height: "10vh", color: "white" }}
          onClick={() => onMenuClick("profile")}
        >
          <CiUser className=" mr-[5%] text-3xl" /> Profile
        </Button>
        <Link to="/dashboard">
          <Button
            sx={{
              width: "100%",
              height: "10vh",
              position: "relative",
              top: "52vh",
              backgroundColor: "#18181B",
              color: "white",
            }}
          >
            Back to Plive
            <IoExitOutline className="text-white text-2xl ml-[5%]" />
          </Button>
        </Link>
      </div>
    </>
  );
}
