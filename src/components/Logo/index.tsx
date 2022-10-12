import styled from "styled-components";

export const LogoContainer = styled.img`
  height: 74px;
  width: 74px;
`;

export const Logo = () => {
  return <LogoContainer src="/SismoLogo.png" />;
};
