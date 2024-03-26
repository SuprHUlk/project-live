import { Button } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function CurrentStreamShow() {
  return (
    <div className="w-[100%] h-[20vh] border-b-[1px] border-gray-800 ">
      <div className="w-[100%] h-[8vh] flex justify-start items-center pl-4">
        Current Stream
      </div>
      <div className="w-[100%] h-[12vh] flex">
        <div className="w-[40%] h-[12vh] flex justify-center items-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1711206464844-dccb0a34deab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
            className="w-[100%] h-[10vh]"
          ></img>
        </div>
        <div className="w-[60%] h-[12vh]">
          <div className="ml-1">
            Stream ID : <span className="text-gray-400">154354</span>
          </div>
          <div className="mt-1 ml-1 flex gap-1">
            <Button variant="contained" color="primary">
              <FaEdit />
            </Button>
            <Button variant="contained" color="error">
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
