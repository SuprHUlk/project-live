import CreateStream from "../StreamMenuItem/Createstream";
import ExtraMenuStream from "../StreamMenuItem/ExtraMenuStream";

interface Props {
  openAlert: (message: string, isDanger: boolean) => void;
}

export default function Streammenu({ openAlert }: Props) {
  return (
    <>
      <div className="w-[82%] h-[92vh] text-white absolute top-[8vh] left-[18%] bg-[#0E0E10] shadow-md overflow-y-auto overflow-x-hidden showhide flex">
        <CreateStream openAlert={openAlert} />
        <ExtraMenuStream />
      </div>
    </>
  );
}
