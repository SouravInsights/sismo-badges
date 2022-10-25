import styled from "styled-components";

export const BadgeListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 320px;
  width: 460px;
  gap: 20px;

  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: #2a3557;
  }
  &::-webkit-scrollbar-thumb {
    background: #525c8f;
    height: 40%;
  }

  @media (max-width: 768px) {
    max-height: 320px;
    width: 320px;
  }
`;

export const BadgeImage = styled.img`
  width: 124px;
  height: 120px;
  cursor: pointer;
`;
