const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");
// import { GoogleGenerativeAI } from "@google/generative-ai";
//   import fs from "fs";

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default async function handler(req, res) {
  const base64String = req.body.base64String;
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDmJgDAc15y-X8zv-1xW3die75T42Oh_0o"
  );

  // Converts local file information to a GoogleGenerativeAI.Part object.
  function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: base64String,
        mimeType: "image/jpeg",
      },
    };
  }

  const prompt = "Describe these images";
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const imagePart = fileToGenerativePart();

  const generatedContent = await model.generateContent([prompt, imagePart]);
  console.log(generatedContent.response.text());
  res.status(200).json({ message: generatedContent.response.text() });

  // Turn images to Part objects
  // const filePart1 = fileToGenerativePart("jetpack.jpg", "image/jpeg");
  // const filePart2 = fileToGenerativePart("piranha.jpg", "image/jpeg");
  // const filePart3 = fileToGenerativePart("firefighter.jpg", "image/jpeg");
}
