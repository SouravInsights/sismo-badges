import styled from "styled-components";

export const BadgeSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 464px;
  width: 70%;
  background-color: #13203d;
  margin: auto;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: auto;
    padding: 0 20px;
  }
`;

export const BadgeSectionHeader = styled.h2`
  font-weight: 500;
  font-size: 26px;
  line-height: 150%;
  text-align: center;
  color: #7c87c4;
`;

export const BadgeLIst = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Badge = styled.img`
  width: 110px;
  height: 106px;
`;
