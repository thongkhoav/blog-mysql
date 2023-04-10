import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import $ from "jquery";
import moment from "moment";
// import single from "../";
import API_URL from "../api/Router";

function Write() {
  const state = useLocation().state;
  // console.log(state);
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  // const [encodeImage, setEncodeImage] = useState("");
  const [cate, setCate] = useState(state?.cate || "");
  const navigate = useNavigate();

  useEffect(() => {
    cate && $("input[type=radio][value=" + cate + "]").attr("checked", true);
  }, [cate]);

  // Functions
  // const handleUpload = async (e) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("filee", file);
  //     formData.append("name", "chó");
  //     const res = await axios.post("/upload", formData);
  //     // setEncodeImage(res.data)
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handlePublish = async (e) => {
    e.preventDefault();
    // const imgUrl = await handleUpload();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("cate", cate);
    formData.append("desc", value);
    formData.append("date", moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));

    try {
      state
        ? await axios.put(`/posts/` + state.id, formData)
        : await axios.post(`/posts`, formData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <WriteContainer>
      {/* <img src={encodeImage} alt="" /> */}
      <Content>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </Content>
      <Menu>
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b>Draft
          </span>
          <span>
            <b>Visibility: </b>Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className="file">
            Upload Image
          </label>
          {/* <button onClick={handleUpload}>upload</button> */}
          <div className="buttons">
            <button>Save as draft</button>
            <button onClick={handlePublish}>
              {state ? "Update" : "Publish"}
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cate">
            <input
              onChange={(e) => setCate(e.target.value)}
              type="radio"
              name="cat"
              value="art"
              id="art"
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cate">
            <input
              onChange={(e) => setCate(e.target.value)}
              type="radio"
              name="cat"
              value="science"
              id="science"
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cate">
            <input
              onChange={(e) => setCate(e.target.value)}
              type="radio"
              name="cat"
              value="technology"
              id="technology"
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cate">
            <input
              onChange={(e) => setCate(e.target.value)}
              type="radio"
              name="cat"
              value="cinema"
              id="cinema"
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cate">
            <input
              onChange={(e) => setCate(e.target.value)}
              type="radio"
              name="cat"
              value="design"
              id="design"
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cate">
            <input
              onChange={(e) => setCate(e.target.value)}
              type="radio"
              name="cat"
              value="food"
              id="food"
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </Menu>
    </WriteContainer>
  );
}

export default Write;

const WriteContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;
const Content = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  gap: 20px;

  input {
    padding: 10px;
    border: 1px solid lightgray;
  }

  .editorContainer {
    height: 300px;
    border: 1px solid lightgray;
    overflow: scroll;

    .editor {
      height: 100%;
      border: none;
    }
  }
`;
const Menu = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .item {
    border: 1px solid lightgray;
    padding: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: space-between;
    font-size: 12px;
    color: #555;

    // PUBLISH
    h1 {
      font-size: 20px;
    }

    .file {
      text-decoration: underline;
      cursor: pointer;
    }

    .buttons {
      display: flex;
      justify-content: space-between;

      button:first-child {
        color: teal;
        background-color: white;
        border: 1px solid teal;
        padding: 3px 5px;
        cursor: pointer;

        &:hover {
          color: white;
          background-color: teal;
          border: 1px solid white;
        }
      } // Save as draft
      button:last-child {
        color: white;
        background-color: teal;
        border: 1px solid white;
        padding: 3px 5px;
        cursor: pointer;

        &:hover {
          color: teal;
          background-color: white;
          border: 1px solid teal;
        }
      } // Update
    }

    // CATEGORY
    .cate {
      display: flex;
      align-items: center;
      gap: 2px;
      color: teal;
    }
  }
`;
