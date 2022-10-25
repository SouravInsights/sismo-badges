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

export const NavButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  padding: 18px 18px;
  align-items: center;
  box-sizing: border-box;
  background: #3f4973;
  cursor: pointer;
  border-radius: 5px;
  color: #e9ecff;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
`;

export const NavCloseButton = styled.div`
  background: none;
  border-width: "0px";
  border-style: "none";
`;
