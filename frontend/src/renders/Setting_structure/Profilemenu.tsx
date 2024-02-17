export default function Profilemenu() {
  return (
    <>
      <div className="w-[82%] h-[92vh] text-white flex  justify-center items-start absolute top-[8vh] left-[18%] bg-[#0E0E10] shadow-md overflow-y-auto overflow-x-hidden showhide">
        <div className="w-[90%] h-[89vh]  mt-[2vh]">
          <div className="w-[100%] text-2xl font-semibold pl-[2%]">
            Profile Information
          </div>
          <div className="w-[100%] h-[30vh] bg-[#222225] mt-[5%] rounded-md">
            <div className="w-[100%] h-[5vh] border-b-[1px] flex justify-start items-center pl-[2%]">
              Profile Preview
            </div>
            <div className="w-[100%] h-[25vh] ">
              <img
                src="https://images.pexels.com/photos/10317493/pexels-photo-10317493.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                className="w-[10%] h-[10vh]"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
