import express from "express";
import cookieParser from "cookie-parser";
import UsersRouter from "./routes/userRouter.js";
import PostsRouter from "./routes/postRouter.js";
import AuthRouter from "./routes/authRouter.js";
import multer from "multer";
import logger from "morgan";

const app = express();
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });


app.use(logger("dev"));
// app.post(
//   "/api/upload",
//   upload.single("file"), function (req, res) {
//     const file = req.file;
//     res.status(200).json(file.filename);
//   })
// ;

// app.post("/api/upload", async (req, res, next) => {

//   var formData = new formidable.IncomingForm();

//   formData.parse(req, function (err, fields, files) {
//     // console.log(files);
//     // console.log(fields);
//     // Read the contents of the image file
//     const imageData = fs.readFileSync(files.file.filepath);
//     // Encode the image data in base64
//     const base64Image = imageData.toString("base64");

//     // res.send(base64Image);
//     res.status(200).json("data:image/png;base64,"+base64Image);
//   });

//   // const file = req.file;
// });

app.use("/api/users", UsersRouter);
app.use("/api/posts", PostsRouter);
app.use("/api/auth", AuthRouter);
app.listen(8800, () => {
  console.log("Port 8800");
});
