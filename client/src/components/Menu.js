import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Menu({ mainPostId, cate }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axios.get("/posts?cate=" + cate);
        setPosts(res.data.filter((post) => post.id !== mainPostId));
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPost();
  }, [cate]);
  return (
    <MenuContainer>
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <Post key={post.id}>
          <img src={post.img} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </Post>
      ))}
    </MenuContainer>
  );
}

export default Menu;

const MenuContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 25px;

  h1 {
    font-size: 20px;
    color: #555;
  }
`;
const Post = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  h2 {
    color: #555;
  }
  button {
    width: max-content;
    padding: 7.5px 15px;
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
`;
