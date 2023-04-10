import { db } from "../db.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import formidable from "formidable";

// GET ALL POSTS
export const getAllPosts = (req, res) => {
  const q = req.query.cate
    ? "SELECT * FROM posts WHERE cate = ?"
    : "SELECT * FROM posts";
  db.query(q, [req.query.cate], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// GET A POST
export const getAPost = async (req, res) => {
  const postId = req.params.id;
  const q =
    "SELECT p.*, u.img as avatar, u.username" +
    " FROM posts p" +
    " JOIN users u ON p.uid = u.id " +
    "WHERE p.id = ?";
  db.query(q, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

// ADD NEW POST
export const newPost = async (req, res) => {
  const token = req.cookies.access_token;
  console.log("token post", token);
  if (!token) return res.status(401).json("Not authenticated to delete.");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    console.log(userInfo);
    var formData = new formidable.IncomingForm();

    formData.parse(req, function (err, fields, files) {
      // console.log({files, fields});

      // Read the contents of the image file
      const imageData = fs.readFileSync(files.file.filepath);
      // Encode the image data in base64
      const base64Image = imageData.toString("base64");

      const readableBase64Image = "data:image/png;base64," + base64Image;

      // console.log(readableBase64Image);
      const q =
        "INSERT INTO posts (`title`, `desc`, `img`, `cate`, `date`, `uid`) VALUES (?)";
      const values = [
        fields.title,
        fields.desc,
        readableBase64Image,
        fields.cate,
        fields.date,
        userInfo.id,
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
      });
    });

    // res.send(base64Image);
    // res.status(200).json("data:image/png;base64," + base64Image);
  });
};

// DELETE A POST
export const deletePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated to delete.");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid.");

    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ? ";
    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(403).json(err);
      return res.status(200).json("The post has been deleted.");
    });
  });
};

// UPDATE A POST
export const updatePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated to delete.");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    var formData = new formidable.IncomingForm();
    formData.parse(req, function (err, fields, files) {
      // console.log({files, fields});
      let hasUpdateImage = true;
      let readableBase64Image = "";
      if (!files.file) {
        hasUpdateImage = false;
      } else {
        // Read the contents of the image file
        const imageData = fs.readFileSync(files.file.filepath);
        // Encode the image data in base64
        const base64Image = imageData.toString("base64");
        readableBase64Image = "data:image/png;base64," + base64Image;
      }


      const q = hasUpdateImage
        ? "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `cate` = ? WHERE id = ? AND uid = ?"
        : "UPDATE posts SET `title` = ?, `desc` = ?, `cate` =? WHERE id = ? AND uid = ?";

      const values = hasUpdateImage
        ? [fields.title, fields.desc, readableBase64Image, fields.cate]
        : [fields.title, fields.desc, fields.cate];
      const postId = req.params.id;
      db.query(q, [...values, postId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated.");
      });
    });
  });
};
