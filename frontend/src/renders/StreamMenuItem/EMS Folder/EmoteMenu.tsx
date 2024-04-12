import React, { useState } from "react";
import { Button } from "@mui/material";
// import ic from "../../../assets/bear_7201640.png";

export default function EmoteMenu() {
  const [emotes, setEmotes] = useState([]);

  const handleRemoveEmote = (index) => {
    const updatedEmotes = [...emotes];
    updatedEmotes.splice(index, 1);
    setEmotes(updatedEmotes);
  };

  const handleAddEmote = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const newEmote = {
          name: file.name,
          url: event.target.result,
        };
        setEmotes([...emotes, newEmote]);
        console.log(emotes); // Log the updated emotes array with objects
      };
      reader.readAsDataURL(file);
    }
  };

  const renderEmotes = () => {
    return emotes.map((emote, index) => (
      <div key={index} className="relative inline-block">
        <img
          src={emote.url}
          className="w-[50px] h-[50px] ml-1 mt-1"
          alt="Emote"
        />
        <button
          className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white font-bold text-xs flex justify-center items-center rounded-full"
          onClick={() => handleRemoveEmote(index)}
        >
          X
        </button>
      </div>
    ));
  };

  return (
    <div className="w-[100%] h-[40vh] border-b-[1px] border-gray-800 ">
      <div className="w-[100%] h-[8vh] flex justify-start items-center pl-4">
        Emote Menu
      </div>
      <div className="w-[100%] h-[25vh] bg-[#18181B] flex flex-wrap overflow-auto">
        {renderEmotes()}
      </div>
      <div className="w-[100%] h-[7vh] flex justify-between items-center">
        <span className="ml-3">Emote Count : {emotes.length}</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleAddEmote}
          style={{ display: "none" }}
          id="upload"
        />
        <label htmlFor="upload">
          <Button variant="contained" color="primary" component="span">
            Add Emote
          </Button>
        </label>
      </div>
    </div>
  );
}
