import { Button } from "@mui/material";
import i1 from "../../assets/justchatting.webp";
import i2 from "../../assets/games.jpg";
import i3 from "../../assets/IRL.jpg";

interface SelectCatProps {
  handleButtonClick: (componentName: string) => void;
}

export default function SelectCat({ handleButtonClick }: SelectCatProps) {
  return (
    <div className="w-[82%] h-[92vh] absolute top-[8vh] left-[18%] flex justify-center items-center">
      <div className="w-[100%] h-max flex justify-center items-center gap-[5%]">
        <Button
          className="w-[20%] h-[20%]"
          onClick={() => handleButtonClick("Irlshow")}
        >
          <img src={i1} alt="Image 1" />
        </Button>
        <Button
          className="w-[20%] h-[20%]"
          onClick={() => handleButtonClick("Gameshow")}
        >
          <img src={i2} alt="Image 2" />
        </Button>
        <Button
          className="w-[20%] h-[20%]"
          onClick={() => handleButtonClick("Othershow")}
        >
          <img src={i3} alt="Image 3" />
        </Button>
      </div>
    </div>
  );
}
