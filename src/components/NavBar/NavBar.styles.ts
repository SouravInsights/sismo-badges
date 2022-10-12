import styled from "styled-components";

export const NavbarContainer = styled.nav`
  margin: 40px auto;
  width: 90%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 700px) {
    height: 80px;
  }
`;
