import { Button } from "@mui/material";
import i1 from "../../assets/1.jpg";
import i2 from "../../assets/2.jpg";
import i3 from "../../assets/3.jpg";
export default function SelectCat() {
  return (
    <>
      <div className="w-[82%] h-[92vh] absolute top-[8vh] left-[18%] flex justify-center items-center">
        <div className="w-[100%] h-max flex justify-center items-center gap-[5%]">
          <Button className="w-[20%] h-[20%]">
            <img src={i1}></img>
          </Button>
          <Button className="w-[20%] h-[20%]">
            <img src={i2}></img>
          </Button>
          <Button className="w-[20%] h-[20%]">
            <img src={i3}></img>
          </Button>
        </div>
      </div>
    </>
  );
}
