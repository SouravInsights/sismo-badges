import {
  BadgeProfileHeaderContainer,
  BadgeProfileAvatar,
  BadgeProfileName,
} from "./BadgeProfileHeader.styles";

export type BadgeProfileHeaderProps = {
  addressOrEns: string;
  avatarSrc: string;
};

export const BadgeProfileHeader = ({
  addressOrEns,
  avatarSrc,
}: BadgeProfileHeaderProps) => {
  return (
    <BadgeProfileHeaderContainer>
      <BadgeProfileAvatar src={avatarSrc} alt="ens avatar" />
      <BadgeProfileName>{addressOrEns}</BadgeProfileName>
    </BadgeProfileHeaderContainer>
  );
};
