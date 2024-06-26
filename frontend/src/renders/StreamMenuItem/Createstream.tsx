import { useState, useEffect } from "react";
import { Button, Chip, Stack } from "@mui/material";
import { details, getDetails } from "../../services/setting-service";
import "../../index.css";

interface Props {
  openAlert: (message: string, isDanger: boolean) => void;
}
const CreateStream: React.FC<Props> = ({ openAlert }) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    tags: string[];
    thumbnail: File | null;
  }>({
    title: "",
    description: "",
    category: "",
    tags: [],
    thumbnail: null,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getDetails();
        if (result.code === 200) {
          setFormData({
            title: result.result.title,
            description: result.result.title,
            category: result.result.category,
            tags: result.result.tags,
            thumbnail: result.result.thumnail,
          });
        }
      } catch (error) {}
    };
    fetch();
  });

  const [newTag, setNewTag] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (newTag.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, newTag],
      }));
      setNewTag("");
    }
  };

  const handleDeleteTag = (index: number) => {
    const updatedTags = [...formData.tags];
    updatedTags.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      tags: updatedTags,
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        thumbnail: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: any = await details(formData);

    if (result.code === 201) {
      localStorage.setItem("streamId", result._id);
      openAlert("You are live: Lego.", false);
    } else if (result.code === 400 && result.error === "Not live") {
      openAlert("OBS Error: First start the stream from obs.", true);
    } else if (result.code === 400 && result.error === "Already live") {
      openAlert(
        "Already Live: Stop the stream from obs to edit the details.",
        true
      );
    } else if (result.code === 500) {
      openAlert("Error: Unknown error occured.", true);
    }
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
                <form
                  className="w-[80%] h-max flex flex-col justify-center items-center mt-[5vh] gap-5"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="title"
                    placeholder="Title of the Stream"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-[60%] h-[5vh] bg-[#2F2F35] rounded-md text-white pl-2"
                  />
                  <textarea
                    name="description"
                    placeholder="Description of the Stream"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-[60%] h-[10vh] bg-[#2F2F35] rounded-md text-white resize-none overflow-auto pl-2"
                  />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-[60%] h-[5vh] bg-[#2F2F35] rounded-md text-white"
                  >
                    <option value="" disabled>
                      Choose Categories
                    </option>
                    <option value="Gaming">Gaming</option>
                    <option value="IRL">IRL</option>
                    <option value="Just Chatting">Just Chatting</option>
                    <option value="Others">Others</option>
                  </select>

                  <div className="w-[60%] h-max bg-[#2F2F35] rounded-md text-white flex items-center">
                    <input
                      type="text"
                      placeholder="Add Tags"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddTag(e)}
                      className="w-[100%] h-[5vh] bg-[#2F2F35] pl-2 rounded-md"
                    />
                  </div>

                  <div className="w-[60%] h-max overflow-x-auto flex items-center flex-nowrap custom-container">
                    <Stack direction="row" spacing={1}>
                      {formData.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          onDelete={() => handleDeleteTag(index)}
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
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="w-[60%] h-max bg-[#2F2F35] rounded-md text-white"
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    sx={{ mt: "6%" }}
                  >
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
};

export default CreateStream;
