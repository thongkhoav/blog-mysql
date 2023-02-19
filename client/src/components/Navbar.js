import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../assets/images/logo.png";
import { AuthContext } from "../context/authContext";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <NavbarContainer>
      <div className="container">
        <Link to="/">
          <Logo>
            <img src={LogoImg} alt="" />
          </Logo>
        </Link>
        <Links>
          <Link to="/?cate=art">
            <h6>ART</h6>
          </Link>
          <Link to="/?cate=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link to="/?cate=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link to="/?cate=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link to="/?cate=design">
            <h6>DESIGN</h6>
          </Link>
          <Link to="/?cate=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Log out</span>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <span className="write">
            <Link to="/write">Write</Link>
          </span>
        </Links>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;

const NavbarContainer = styled.div`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
  }
`;

const Logo = styled.div`
  img {
    width: 120px;
  }
`;
const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  a {
    h6 {
      font-size: 16px;
      font-weight: 300;
    }
  }

  span {
    cursor: pointer;
  }

  .write {
    background-color: var(--lightGreen);
    width: 50px;
    height: 50px;
    border-radius: 100rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;
    border: 1px solid transparent;
    // Prevent border push the others
    // box-sizing; desc w,h; border-transparent

    &:hover {
      background-color: white;
      color: teal;
      border: 1px solid teal;
    }
  }
`;
