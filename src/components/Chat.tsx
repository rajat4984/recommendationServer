import axios from "axios";
import { ChangeEvent, useState } from "react";

const Chat = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
      console.log(files);
    }
  };

  const handlePhotoSubmit = async () => {
    if (selectedFiles.length > 0) {
      try {
        const uploadPromises = selectedFiles.map(async (file) => {
          let data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "recommender");
          data.append("upload_name", "dobzi0uvb");
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dobzi0uvb/image/upload",
            data
          );

          return res.data.secure_url;
        });
        const results = await Promise.all(uploadPromises);
        console.log(selectedFiles, "selectedFiles");
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      console.log("No files selected");
    }
  };

  return (
    <>
      <div className="bg-[#272627] text-[#f8f8f8] h-[78vh] mx-5 md:w-1/2 w-10/12 rounded-t-xl fixed bottom-0 left-[50%] md:translate-x-[-50%] translate-x-[-55%]">
        <div className="relative h-[100%]">
          <p className="p-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam culpa
            voluptatibus corrupti itaque! Magni, sequi officiis? Eos quisquam
            debitis hic, illo ipsum harum est provident itaque veritatis ex
            sequi blanditiis.
          </p>

          <input
            type="file"
            multiple
            className="absolute bottom-5 left-[50%]  md:translate-x-[-50%] translate-x-[-40%] "
            onChange={handleFiles}
          />

          <button onClick={handlePhotoSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
