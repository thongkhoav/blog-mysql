import express from "express";
import cookieParser from "cookie-parser";
import UsersRouter from "./routes/users.js";
import PostsRouter from "./routes/posts.js";
import AuthRouter from "./routes/auth.js";
import multer from "multer";

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

app.post(
  "/api/upload",
  upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  })
;

app.use("/api/users", UsersRouter);
app.use("/api/posts", PostsRouter);
app.use("/api/auth", AuthRouter);
app.listen(8800, () => {
  console.log("Port 8800");
});
