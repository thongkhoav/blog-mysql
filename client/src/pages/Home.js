import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axios.get("/posts" + location?.search);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPost();
  }, [location?.search]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <HomeContainer>
      <Posts>
        {posts.map((post) => (
          <Post key={post.id}>
            <div className="img">
              <img
                // onError={(e) => (e.target.src = `../upload/${post.img}`)}
                src={post.img}
                alt=""
              />
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button>
                <Link to={`/post/${post.id}`}>Read More</Link>
              </button>
            </div>
          </Post>
        ))}
      </Posts>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  width: 100%;
`;

const Posts = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 150px;
`;
const Post = styled.div`
  display: flex;
  width: 100%;
  gap: 100px;

  &:nth-child(2n + 1) {
    flex-direction: row-reverse;
  }

  .img {
    flex: 1;
    position: relative;

    /* &::after {
      content: "";
      width: 100%;
      height: 100%;
      background-color: var(--lightGreen);
      position: absolute;
      top: 20px;
      left: -20px;
      z-index: -1;
    } */

    img {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: 10px;
      box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.14);
      border: 1px solid rgba(0, 0, 0, 0);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  } // img div

  .content {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h1 {
      font-size: 35px;
    }

    p {
      text-align: justify;
      font-size: 18px;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    button {
      width: max-content;
      padding: 10px 20px;
      border: 1px solid var(--lightGreen);
      background-color: white;
      cursor: pointer;
      color: teal;

      &:hover {
        border: 1px solid white;
        background-color: var(--lightGreen);
        color: black;
      }
    }
  }
`;
