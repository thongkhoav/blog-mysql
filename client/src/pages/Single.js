import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Edit from "../assets/images/edit.png";
import Delete from "../assets/images/delete.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import avatar from '../assets/images/unnamed.jpg'

function Single() {
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const {id: postId} = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(post, currentUser);

  // fetch 
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get("/posts/" + postId);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      await axios.delete("/posts/" + postId);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <SingleContainer>
      <Content>
        <img src={post?.img} alt="" />
        <div className="user">
          <img src={post?.avatar || avatar} alt="" />
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser?.username === post?.username && (
            <div className="action">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDeletePost} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post?.title}</h1>
        <p>{getText(post?.desc)}</p>
      </Content>
      <Menu mainPostId={post.id} cate={post.cate} />
    </SingleContainer>
  );
}

export default Single;

const SingleContainer = styled.div`
  display: flex;
  gap: 50px;
`;

const Content = styled.div`
  flex: 5;
  display: flex; // just for gap
  flex-direction: column;
  gap: 30px;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 100rem;
      object-fit: cover;
      background-color: #b9e7e7;
    }

    span {
      font-weight: bold;
    }

    .action {
      display: flex;
      gap: 5px;

      img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  } // end user

  h1 {
    font-size: 42px;
    color: #333;
  }

  p {
    text-align: justify;
    line-height: 30px;
  }
`;
