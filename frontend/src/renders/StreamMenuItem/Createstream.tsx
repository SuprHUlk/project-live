import { useState } from "react";
import { Button, Chip, Stack } from "@mui/material";
import "../../index.css";
function CreateStream() {
  const [clips, setClips] = useState<string[]>([]);
  const [newClip, setNewClip] = useState("");
  const username = localStorage.getItem("username");

  const handleAddClip = (event: any) => {
    event.preventDefault();
    if (newClip.trim() !== "") {
      setClips((prevClips) => [...prevClips, newClip]);
      setNewClip("");
    }
  };

  const handleDeleteClip = (index: any) => {
    const updatedClips = [...clips];
    updatedClips.splice(index, 1);
    setClips(updatedClips);
  };

  return (
    <>
      <div className="w-[78%] h-[92vh] bg-[#222225] ml-[1%]">
        <div className="w-[100%] h-[10vh]  flex justify-between items-center pl-5 text-xl font-bold border-b-[1px] border-gray-700">
          Welcome To Creator Dashboard
        </div>
        <div className="w-[100%] h-[82vh] flex justify-center items-center ">
          <div className="w-[90%] h-[80vh] ">
            <div className="w-[100%] h-[82vh]">
              <div className="w-[100%] h-[80vh] flex justify-center">
                <form className="w-[80%] h-max flex flex-col justify-center items-center mt-[5vh] gap-5">
                  <input
                    placeholder="Title of the Stream"
                    className="w-[60%] h-[5vh] bg-[#2F2F35] rounded-md text-white pl-2"
                  />
                  <textarea
                    placeholder="Description of the Stream"
                    className="w-[60%] h-[10vh] bg-[#2F2F35] rounded-md text-white resize-none overflow-auto pl-2"
                  />

                  <select
                    name="categories"
                    id="categories"
                    className="w-[60%] h-[5vh] bg-[#2F2F35] rounded-md text-white"
                  >
                    <option value="" disabled selected>
                      Choose Categories
                    </option>
                    <option value="volvo">Gaming</option>
                    <option value="saab">IRL</option>
                    <option value="opel">Just Chatting</option>
                    <option value="opel">others</option>
                  </select>

                  <div className="w-[60%] h-max bg-[#2F2F35] rounded-md text-white flex items-center">
                    <input
                      type="text"
                      placeholder="Add Tags"
                      value={newClip}
                      onChange={(e) => setNewClip(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddClip(e)}
                      className="w-[100%] h-[5vh] bg-[#2F2F35] pl-2 rounded-md"
                    />
                  </div>

                  <div className="w-[60%] h-max overflow-x-auto flex items-center flex-nowrap custom-container">
                    <Stack direction="row" spacing={1}>
                      {clips.map((clip, index) => (
                        <Chip
                          key={index}
                          label={clip}
                          onDelete={() => handleDeleteClip(index)}
                          sx={{ mr: 1, mb: 1, color: "white" }}
                        />
                      ))}
                    </Stack>
                  </div>

                  <label htmlFor="image" className="text-white">
                    Select Thumbnail:
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    className="w-[60%] h-max bg-[#2F2F35] rounded-md text-white"
                  />

                  <Button variant="contained" color="error" sx={{ mt: "6%" }}>
                    Create the Stream
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateStream;
