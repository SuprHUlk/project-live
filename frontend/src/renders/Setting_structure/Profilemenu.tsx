import { Button } from "@mui/material";
import { useState } from "react";

export default function Profilemenu() {
  const storedUsername = localStorage.getItem("username") ?? "DefaultUsername";
  const [username, setUsername] = useState(storedUsername);
  const [editMode, setEditMode] = useState(false);
  const [tempUsername, setTempUsername] = useState(storedUsername);

  const handleEditClick = () => {
    setTempUsername(username);
    setEditMode(true);
  };

  const handleSaveClick = () => {
    const lastChangeTimestampString =
      localStorage.getItem("lastUsernameChange") || "0";
    const lastChangeTimestamp = parseInt(lastChangeTimestampString, 10);
    const currentTime = new Date().getTime();
    const cooldownPeriod = 60 * 24 * 60 * 60 * 1000;
    if (currentTime - lastChangeTimestamp >= cooldownPeriod) {
      setEditMode(false);
      localStorage.setItem("username", username);

      localStorage.setItem("lastUsernameChange", currentTime.toString());
    } else {
      alert("You can only change your username once every 60 days.");
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setUsername(tempUsername);
  };

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
            <div className="w-[100%] h-[25vh] flex justify-center items-center">
              <img
                src="https://images.pexels.com/photos/10317493/pexels-photo-10317493.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                className="w-[10%]  rounded-lg"
              ></img>
              <div className="ml-[5%] text-4xl font-semibold">
                About {username}
                <div className="text-lg mt-[1%]">0 Follower</div>
                <Button variant="contained" sx={{ backgroundColor: "#3F4448" }}>
                  Edit Avatar
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[100%] h-[20vh] bg-[#222225] mt-[5%] rounded-md">
            <div className="w-[100%] h-[5vh] border-b-[1px] flex justify-start items-center pl-[2%]">
              Username
            </div>
            <div className="w-[100%] h-[15vh] flex justify-center flex-col items-center">
              <div className="w-[100%] h-[10vh] flex justify-center items-center">
                <input
                  placeholder={storedUsername}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`pl-[2%] bg-[#414146] w-[80%] h-[6vh] rounded-md ml-[2%] ${
                    editMode ? "" : "pointer-events-none"
                  }`}
                  disabled={!editMode}
                />
                {editMode ? (
                  <>
                    <Button
                      onClick={handleCancelClick}
                      variant="contained"
                      sx={{
                        backgroundColor: "red",
                        height: "5vh",
                        width: "10%",
                        margin: "1%",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveClick}
                      variant="contained"
                      sx={{
                        backgroundColor: "blue",
                        height: "5vh",
                        width: "10%",
                        margin: "1%",
                      }}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleEditClick}
                    variant="contained"
                    sx={{
                      backgroundColor: "#3F4448",
                      height: "5vh",
                      width: "10%",
                      margin: "1%",
                    }}
                  >
                    Edit
                  </Button>
                )}
              </div>
              <div className="text-sm text-white/50">
                Once you change your username, you will need to wait for 60 days
                to change it again
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
