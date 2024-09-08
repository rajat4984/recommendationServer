const  { GoogleAIFileManager } = require("@google/generative-ai/server")
const {GoogleGenerativeAI} = require("@google/generative-ai")

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default async function handler(req, res) {
  if (req.method === "POST") {
    upload.single("file")(
      req,
      res,
      (async(err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Fille upload error", details: err.message });
        }
        try {
          const fileBuffer = req.file.buffer;
          const fileName = req.file.originalName;
          const mimeType = req.file.mimeType;

          const fileManager = new GoogleAIFileManager(
            "AIzaSyDmJgDAc15y-X8zv-1xW3die75T42Oh_0o");
          const uploadResult = await fileManager.uploadFile(fileBuffer,{
            mimeType,
            displayName:fileName
          })

          const genAI = new GoogleGenerativeAI("AIzaSyDmJgDAc15y-X8zv-1xW3die75T42Oh_0o");
          const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"});
          const result = await model.generateContent([
            'tell me about this image',
            {
              fileData:{
                fileUri:uploadResult.file.uri,
                mimeType:uploadResult.file.mimeType
              }
            }
          ])

          res.status(200).json({
            fileUri: uploadResult.file.uri,
            result,
          });
        } catch (error) {
          res.status(500).json({ error: 'Error processing file', details: error.message });
        }
      })
    );
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
