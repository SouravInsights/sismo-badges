import { useEffect, useState } from "react";

import {
  BadgeProfileHeader,
  BadgeCard,
  BadgeSectionWrapper,
  BadgeList,
  BadgeSectionHeader,
} from "../../Badge";
import { useWallet } from "../../../wallet";
import { useFetch } from "../../../wallet/hooks";
import { useSismoBadgeContract, useENS } from "../../../lib/hooks";
import { getTokenBalance, truncateAddress } from "../../../lib/utils";

export const BadgeSection = () => {
  const sismoPolygonBadgeContract = useSismoBadgeContract(
    "0x71a7089C56DFf528f330Bc0116C0917cd05B51Fc",
    true
  );

  const sismoCuratedBadgeContract = useSismoBadgeContract(
    "0xf12494e3545d49616d9dfb78e5907e9078618a34",
    true
  );

  const { data: playgroundEnvData } = useFetch({
    url: "https://hub.playground.sismo.io/badges/polygon",
  });

  const { data: curatedEnvData } = useFetch({
    url: "https://hub.sismo.io/badges/polygon",
  });

  const wallet = useWallet();

  const activeAddress = wallet.connectedList[0].accounts[0].address;
  const truncatedAddress = truncateAddress(activeAddress);

  const { ensName, ensAvatar, loading } = useENS(activeAddress);

  /* 
    fetch all non zero playground badge ids & their metadata 
  */

  const [playgroundBadgeId, setPlaygroundBadgeId] = useState();
  const [playgroundBadgeData, setPlaygroundBadgeData] = useState<any>();

  useEffect(() => {
    if (playgroundEnvData && activeAddress) {
      playgroundEnvData.items.map(async (token) => {
        const balance = await getTokenBalance(
          sismoPolygonBadgeContract,
          activeAddress,
          token.collectionId
        );

        if (balance > 0) {
          setPlaygroundBadgeId(token.collectionId);
        }
      });
    }
  }, [sismoPolygonBadgeContract, activeAddress, playgroundEnvData]);

  useEffect(() => {
    if (playgroundEnvData) {
      const getPlaygroundBadgeData = async () => {
        const playgroundBadgeData = await playgroundEnvData.items.filter(
          (token) => token.collectionId === playgroundBadgeId
        );
        setPlaygroundBadgeData(playgroundBadgeData);
      };
      getPlaygroundBadgeData();
    }
  }, [playgroundBadgeId, playgroundEnvData]);

  /* 
    fetch all non zero curated badge ids & their metadata 
  */

  const [curatedBadgeId, setCuratedBadgeId] = useState();
  const [curatedBadgeData, setCuratedBadgeData] = useState<any>();

  useEffect(() => {
    if (curatedEnvData && activeAddress) {
      curatedEnvData.items.map(async (token) => {
        const balance = await getTokenBalance(
          sismoCuratedBadgeContract,
          activeAddress,
          token.collectionId
        );

        if (balance > 0) {
          setCuratedBadgeId(token.collectionId);
        }
      });
    }
  }, [sismoCuratedBadgeContract, activeAddress, curatedEnvData]);

  useEffect(() => {
    if (curatedEnvData) {
      const getCuratedBadgeData = async () => {
        const curatedBadgeData = await curatedEnvData.items.filter(
          (token) => token.collectionId === curatedBadgeId
        );
        setCuratedBadgeData(curatedBadgeData);
      };
      getCuratedBadgeData();
    }
  }, [curatedBadgeId, curatedEnvData]);

  return (
    <BadgeSectionWrapper>
      <BadgeProfileHeader
        addressOrEns={ensName || truncatedAddress}
        avatarSrc={
          loading
            ? "https://res.cloudinary.com/dp5xqavlz/image/upload/v1665603466/fallback-avatar_mjifmt.png"
            : ensAvatar
        }
      />

      <BadgeSectionHeader>My Badges</BadgeSectionHeader>
      <BadgeList>
        {playgroundBadgeData?.map((token) => (
          <BadgeCard
            key={token.collectionId}
            title={token.name}
            desc={token.description}
            imgSrc={token.image}
            imgAltText={token.name}
          />
        ))}

        {curatedBadgeData?.map((token) => (
          <BadgeCard
            key={token.collectionId}
            title={token.name}
            desc={token.description}
            imgSrc={token.image}
            imgAltText={token.name}
          />
        ))}
      </BadgeList>
    </BadgeSectionWrapper>
  );
};
