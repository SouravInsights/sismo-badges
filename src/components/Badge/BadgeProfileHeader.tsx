import {
  BadgeProfileHeaderContainer,
  ProfileAvatar,
  ProfileText,
  ProfileBadges,
  BadgesIcon,
} from "./BadgeProfileHeader.styles";

export type BadgeProfileHeaderProps = {
  addressOrEns: string;
  avatarSrc: string;
  transactions: number;
  badges: number;
};

export const BadgeProfileHeader = ({
  addressOrEns,
  avatarSrc,
  transactions,
  badges,
}: BadgeProfileHeaderProps) => {
  return (
    <BadgeProfileHeaderContainer>
      <ProfileAvatar src={avatarSrc} alt="profile avatar" />
      <ProfileText>{addressOrEns}</ProfileText>
      <ProfileText>{`${transactions} Tx`}</ProfileText>
      <ProfileBadges>
        {badges}
        <BadgesIcon src="./BadgeIcon.svg" alt="badge icon" />
      </ProfileBadges>
    </BadgeProfileHeaderContainer>
  );
};
