import Navbar from "./Navbar";
import Sidebar from "../renders/Dashboard_structure/Sidebar";
import SeletCad from "../renders/Dashboard_structure/SelectCat";
interface Props {
  openAlert: (message: string, isDanger: boolean) => void;
}

function Dashboard({ openAlert }: Props) {
  return (
    <>
      <Navbar />
      <div
        className="w-[100%] h-[100vh] flex justify-between items-center bg-[#0E0E10] text-white"
        id="mainbg"
      >
        <Sidebar openAlert={openAlert} />
        <SeletCad />
      </div>
    </>
  );
}
export default Dashboard;
