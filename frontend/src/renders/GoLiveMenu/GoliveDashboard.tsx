import { Button } from "@mui/material";

export default function GoliveDashboard() {
  return (
    <>
      <div className="w-[100%] h-[92vh] bg-black/80 flex justify-center items-center absolute top-[8vh]">
        <div className="w-[50%] h-[85vh] bg-[#18181B] rounded-md border-[1px] border-gray-800">
          <div className="w-[100%] text-white h-[5vh] flex justify-start items-center pl-[5%] text-xl border-b-[1px] border-gray-500">
            Create Your Stream
          </div>
          <div className="w-[100%] h-[80vh] flex justify-center">
            <form className="w-[80%] h-max flex flex-col justify-center items-center mt-[5vh] gap-5">
              <input
                placeholder="Title of the Stream"
                className="w-[60%] h-[5vh] bg-[#2F2F35] rounded-md text-white pl-2"
              ></input>
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
              <br />
              <br />
              {/* Image Selection Button */}
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

              <div className="w-[100%] h-[5vh] flex justify-evenly items-center text-white">
                <label>Is this stream for kids?</label>
                <label htmlFor="yes">Yes</label>
                <input type="radio" id="yes" name="kids" />
                <label htmlFor="no">No</label>
                <input type="radio" id="no" name="kids" />
              </div>
              <Button variant="contained" color="error">
                Create the Stream
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
