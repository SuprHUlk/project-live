import { useState } from "react";
import { Button, Chip } from "@mui/material";
import imgjs from "../../assets/justchatting.webp";
import pfp from "../../assets/pfp.jpg";

// Sample array of tags
const tagsArray = ["Gaming", "Music", "Art", "Fitness"];

export default function Irlshow() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: any) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="w-[82%] h-[92vh] absolute top-[8vh] left-[18%] bg-[#0E0E10] overflow-auto">
      <div className="w-[100%] h-max">
        <div className="w-[100%] h-[30vh]  flex">
          <img src={imgjs} className="w-[12%] h-[30vh] ml-5" alt="Image" />
          <div className="ml-5">
            <div className="text-3xl font-bold m-2">JUST CHATTING</div>
            <div className="font-bold m-2">0 Viewer</div>
            <div className="m-2 w-[20%] h-[5vh] bg-blue-800/40 rounded-3xl flex justify-center items-center">
              IRL
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[5vh] ">
          <Button
            sx={{
              marginLeft: "1%",
              color: "white",
              borderBottom: "2px blue solid",
              borderRadius: "0",
            }}
          >
            Live Channels
          </Button>
        </div>
        {/* Here the element render the stream section */}
        <div className="w-[100%] h-max mt-2 flex gap-5 flex-wrap justify-start">
          {/* Stream templete here  */}
          <div className="w-[30%] h-[50vh] ml-5">
            <div className="w-[100%] h-[30vh] bg-green-200"></div>
            <div className="w-[100%]h-[20vh]">
              <div className="w-[100%] h-[10vh] mt-2 flex justify-start items-center">
                <img
                  src={pfp}
                  className="w-[10%] ml-2 rounded-[50%]"
                  alt="Profile"
                />
                <div className="text-xl font-bold w-[100%] ml-3 text-gray-500 hover:text-blue-400 hover:cursor-pointer">
                  Faiz Khan is Live
                </div>
              </div>
              <div className="ml-[3%] font-bold">Just Chatting</div>
              <div className="100% h-max mt-2">
                {/* Chip tags */}
                {tagsArray.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onClick={() => handleTagClick(tag)}
                    variant={selectedTags.includes(tag) ? "outlined" : "filled"}
                    className="m-1"
                    sx={{
                      backgroundColor: "#24272C",
                      color: "white",
                      marginLeft: "1%",
                    }}
                    color={selectedTags.includes(tag) ? "primary" : "default"}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Here the templete end  */}
        </div>
      </div>
    </div>
  );
}
