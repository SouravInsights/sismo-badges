import { FooterContainer, FooterLinks } from "./Footer.styles";
import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FaTwitter size={20} color="white" />
        <FaDiscord size={20} color="white" />
        <FaGithub size={20} color="white" />
      </FooterLinks>
      <div style={{ color: "white" }}>© 2022 Sismo.io All rights reserved.</div>
    </FooterContainer>
  );
};
