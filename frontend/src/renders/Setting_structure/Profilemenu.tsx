import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { CiInstagram, CiYoutube } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import {
  changeUsername,
  changeBio,
  changeSocials,
  get,
} from "../../services/setting-service";
import { FaDiscord } from "react-icons/fa";
export default function Profilemenu() {
  const [username, setUsername] = useState(localStorage.getItem("username")!);
  const storedUsername = localStorage.getItem("username") ?? "DefaultUsername";
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [discord, setDiscord] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [bioEditMode, setBioEditMode] = useState(false);
  const [socialsEditMode, setSocialsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get();
        setBio(result.bio);
        setInstagram(result.socials.instagram);
        setDiscord(result.socials.discord);
        setYoutube(result.socials.youtube);
        setTwitter(result.socials.twitter);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    const result = await changeUsername(username);
    localStorage.setItem("username", result);
    setUsername(result);
    handleCancelClick();
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  // Bio section functions
  const handleEditClickBio = () => {
    setBioEditMode(true);
  };

  const handleSaveClickBio = async () => {
    const result = await changeBio(bio);
    setBio(result);
    handleCancelClickBio();
  };

  const handleCancelClickBio = () => {
    setBioEditMode(false);
  };

  // Socials section functions
  const handleEditClickSocials = () => {
    setSocialsEditMode(true);
  };

  const handleSaveClickSocials = async () => {
    const result = await changeSocials({
      instagram: instagram,
      discord: discord,
      youtube: youtube,
      twitter: twitter,
    });
    setInstagram(result.instagram);
    setDiscord(result.discord);
    setYoutube(result.youtube);
    setTwitter(result.twitter);
    handleCancelClickSocials();
  };

  const handleCancelClickSocials = () => {
    setSocialsEditMode(false);
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
                alt="Profile"
              ></img>
              <div className="ml-[5%] text-4xl font-semibold">
                About {localStorage.getItem("username")}
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
          <div className="w-[100%] h-[20vh] bg-[#222225] mt-[5%] rounded-md">
            <div className="w-[100%] h-[5vh] border-b-[1px] flex justify-start items-center pl-[2%]">
              Bio
            </div>
            <div className="w-[100%] h-[15vh] flex justify-center flex-col items-center">
              <div className="w-[100%] h-[10vh] flex justify-center items-center">
                <input
                  placeholder="Please enter your description for the About panel on your channel page (Maximum 500 characters)"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={`pl-[2%] bg-[#414146] w-[80%] h-[6vh] rounded-md ml-[2%] ${
                    bioEditMode ? "" : "pointer-events-none"
                  }`}
                  disabled={!bioEditMode}
                />
                {bioEditMode ? (
                  <>
                    <Button
                      onClick={handleCancelClickBio}
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
                      onClick={handleSaveClickBio}
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
                    onClick={handleEditClickBio}
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
            </div>
          </div>
          <div className="w-[100%] h-[20vh] bg-[#222225] mt-[5%] rounded-md">
            <div className="w-[100%] h-[5vh] border-b-[1px] flex justify-start items-center pl-[2%]">
              Socials
            </div>
            <div className="w-[100%] h-[15vh] flex justify-center flex-col items-center">
              <div className="w-[100%] h-[10vh] flex justify-center items-center">
                <label className="text-2xl relative left-[5%] text-blue-500 ">
                  <CiInstagram />
                </label>
                <input
                  placeholder="Instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className={`pl-[4%] bg-[#414146] w-[20%] h-[6vh] rounded-md ml-[2%] ${
                    socialsEditMode ? "" : "pointer-events-none"
                  }`}
                  disabled={!socialsEditMode}
                />
                <label className="text-2xl relative left-[5%] text-blue-500">
                  <FaXTwitter />
                </label>
                <input
                  placeholder="X.com"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className={`pl-[4%] bg-[#414146] w-[20%] h-[6vh] rounded-md ml-[2%] ${
                    socialsEditMode ? "" : "pointer-events-none"
                  }`}
                  disabled={!socialsEditMode}
                />
                <label className="text-2xl relative left-[5%] text-blue-500">
                  <CiYoutube />
                </label>
                <input
                  placeholder="YouTube"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  className={`pl-[4%] bg-[#414146] w-[20%] h-[6vh] rounded-md ml-[2%] ${
                    socialsEditMode ? "" : "pointer-events-none"
                  }`}
                  disabled={!socialsEditMode}
                />
                <label className="text-2xl relative left-[5%] text-blue-500">
                  <FaDiscord />
                </label>
                <input
                  placeholder="Discord"
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                  className={`pl-[4%] bg-[#414146] w-[20%] h-[6vh] rounded-md ml-[2%] ${
                    socialsEditMode ? "" : "pointer-events-none"
                  }`}
                  disabled={!socialsEditMode}
                />
                {socialsEditMode ? (
                  <>
                    <Button
                      onClick={handleCancelClickSocials}
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
                      onClick={handleSaveClickSocials}
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
                    onClick={handleEditClickSocials}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
