import styled from "styled-components";

export const BadgeProfileHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 36px;
  gap: 26px;
  width: 70%;
  background: #1a2a4d;
  border-radius: 10px;
`;

export const BadgeProfileAvatar = styled.img`
  width: 170px;
  height: 170px;
  border: 8px solid #13203e;
  border-radius: 50%;
`;

export const BadgeProfileName = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 23px;
  width: 250px;
  height: 46px;
  background: #1c2e54;
  color: #7c87c4;
  border-radius: 6px;
`;
