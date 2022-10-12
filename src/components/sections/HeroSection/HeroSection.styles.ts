import styled from "styled-components";

export const HeroSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 564px;
  width: 70%;
  background-color: #13203d;
  margin: auto;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: auto;
    padding: 0 20px;
  }
`;

export const HeroSectionContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  gap: 60px;
  padding: 0 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 120px 20px;
  }
`;

export const HeroSectionContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 10px;
  width: 40%;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const HeroSectionContentRight = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 10px;
  width: 40%;
`;

export const HeroSectionContentHeader = styled.h2`
  font-weight: 500;
  font-size: 22px;
  line-height: 150%;
  text-align: center;
  color: #7c87c4;
`;
