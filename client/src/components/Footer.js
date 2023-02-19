import React from "react";
import styled from "styled-components";
import Logo from "../assets/images/logo.png";

function Footer() {
  return (
    <FooterContainer>
      <img src={Logo} alt="" />
      <span>
        Made with 💗 and <b>React.js</b>
      </span>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.footer`
  margin-top: 100px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--lightGreen);
  font-size: 12px;
  img {
    height: 50px;
  }
`;
