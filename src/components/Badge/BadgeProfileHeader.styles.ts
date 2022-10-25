import styled from "styled-components";

export const BadgeProfileHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px;
  gap: 12px;
  height: 52px;
  background: #2a3557;
  border-radius: 2px;
`;

export const ProfileAvatar = styled.img`
  width: 44px;
  height: 34px;
`;

export const ProfileText = styled.h2`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #e9ecff;
`;

export const ProfileBadges = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #e9ecff;
`;

export const BadgesIcon = styled.img`
  width: 18px;
  height: 14px;
`;
