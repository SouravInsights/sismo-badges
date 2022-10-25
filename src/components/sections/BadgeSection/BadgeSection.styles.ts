import styled from "styled-components";

export const BadgeSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-right: 60px;
  padding-left: 60px;
  padding-top: 60px;
  padding-bottom: 60px;
  width: 70%;
  background-color: #13203d;
  margin: auto;
  border-radius: 10px;
`;

export const BadgeSectionContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  gap: 40px;

  @media (max-width: 1170px) {
    width: auto;
    flex-direction: column;
    align-items: center;
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const BadgeSectionHeader = styled.h2`
  display: flex;
  justify-content: flex-end;
  padding-right: 20%;
  padding-bottom: 10px;
  font-weight: 500;
  font-size: 26px;
  line-height: 150%;
  color: #ffffff;

  @media (max-width: 1170px) {
    padding-right: none;
    justify-content: center;
  }
`;
