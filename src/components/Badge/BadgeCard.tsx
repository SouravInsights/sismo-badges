import {
  BadgeCardContainer,
  BadgeCardContent,
  BadgeTitle,
  BadgeDesc,
  BadgeImageContainer,
  BadgeImage,
} from "./BadgeCard.styles";

export type BadgeCardProps = {
  title: string;
  desc: string;
  imgSrc: string;
  imgAltText: string;
};

export const BadgeCard = ({
  title,
  desc,
  imgSrc,
  imgAltText,
}: BadgeCardProps) => {
  return (
    <BadgeCardContainer>
      <BadgeImageContainer>
        <BadgeImage src={imgSrc} alt={imgAltText} />
      </BadgeImageContainer>
      <BadgeCardContent>
        <BadgeTitle>{title}</BadgeTitle>
        <BadgeDesc>{desc}</BadgeDesc>
      </BadgeCardContent>
    </BadgeCardContainer>
  );
};
