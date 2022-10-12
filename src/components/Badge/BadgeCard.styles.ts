import styled from "styled-components";

export const BadgeSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;

export const BadgeSectionHeader = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 23px;
  width: 250px;
  height: 46px;
  background: #13203d;
  color: #7c87c4;
  border-radius: 6px;
`;

export const BadgeCardContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: center;
  padding: 24px 24px;
  gap: 16px;
  background: #13203d;
  border-radius: 10px;
  width: 341px;
  height: auto;
`;

export const BadgeList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 28px;
`;

export const BadgeCardContent = styled.div`
  gap: 12px;
  color: #e9ecff;
`;

export const BadgeTitle = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
`;

export const BadgeDesc = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 131%;
`;

export const BadgeImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const BadgeImage = styled.img`
  width: 124px;
  height: 120px;
`;
