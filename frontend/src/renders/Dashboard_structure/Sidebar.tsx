import { FaHeart } from "react-icons/fa";
import "../../index.css";
import { CiUser } from "react-icons/ci";

export default function Sidebar() {
  const formatFollowerCount = (count: any) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "m";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    } else {
      return count;
    }
  };

  const users = [
    {
      src: "https://images.pexels.com/photos/10317493/pexels-photo-10317493.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      name: "Faiz",
      followerCount: 123456,
    },
    {
      src: "https://images.pexels.com/photos/10317493/pexels-photo-10317493.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      name: "Ayush",
      followerCount: 7890,
    },
  ];

  return (
    <>
      <div className="w-[18%] h-[92vh] absolute top-[8vh] bg-[#222225] shadow-md overflow-y-auto overflow-x-hidden showhide">
        <div className="font-bold pl-5 w-[100%] h-[5vh]  flex justify-start items-center">
          <FaHeart className="mr-3" />
          Following
        </div>
        <div className="text-[0.8rem] font-light  w-[100%] h-[5vh]  flex justify-start items-center pl-5 border-b-[1px] ">
          You are currently following these channels
        </div>
        <div className="flex flex-col gap-1 w-[100%]">
          {users.map((user, index) => (
            <div key={index} className="hover:bg-[#2d2d32] cursor-pointer">
              <div className="w-[100%] h-[8vh]  flex justify-between items-center">
                <img
                  src={user.src}
                  className="w-[15%] h-[80%] ml-[5%] rounded-[50%]"
                  alt={user.name}
                ></img>
                <div className="w-[50%] h-[8vh]  flex justify-center items-center">
                  {user.name}
                </div>
                <div className="w-[30%] h-[8vh] flex justify-center items-center">
                  <CiUser className="mr-[5%] text-blue-900" />
                  {formatFollowerCount(user.followerCount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
