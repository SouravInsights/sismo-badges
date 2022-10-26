import { useEffect, useState } from "react";

import { BadgeProfileHeader, BadgeListWrapper, BadgeImage } from "../../Badge";
import {
  BadgeSectionWrapper,
  BadgeSectionContent,
  BadgeSectionHeader,
} from "./BadgeSection.styles";
import { ToolTip } from "../../primitives";
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

  // const multicallContract = useMulticallContract(
  //   "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441",
  //   true
  // );

  // console.log('multicallContract aggregate', multicallContract);

  const { data: playgroundEnvData } = useFetch({
    url: "https://hub.playground.sismo.io/badges/polygon",
  });

  const { data: curatedEnvData } = useFetch({
    url: "https://hub.sismo.io/badges/polygon",
  });

  const wallet = useWallet();
  const activeAddress = wallet?.connectedList[0]?.accounts[0]?.address;

  const truncatedAddress = truncateAddress(activeAddress);

  const { ensName } = useENS(activeAddress);

  /* 
    fetch all non zero playground badge ids & their metadata 
  */

  const [playgroundMintedBadgeIds, setPlaygroundMintedBadgeIds] = useState([]);
  const [playgroundBadgesData, setPlaygroundBadgesData] = useState([]);

  useEffect(() => {
    async function fetchNonZeroTokenBalances() {
      if (playgroundEnvData?.items) {
        const nonZeroTokenIds = await Promise.all(
          playgroundEnvData?.items?.map(async (token) => {
            const balance = await getTokenBalance(
              sismoPolygonBadgeContract,
              activeAddress,
              token.collectionId
            );
            if (balance > 0) {
              return token.collectionId;
            }
            return null;
          })
        );
        const filteredTokenIds = nonZeroTokenIds?.filter(
          (balance) => balance !== null
        );
        setPlaygroundMintedBadgeIds(filteredTokenIds);
      }
    }

    fetchNonZeroTokenBalances();
  }, [playgroundEnvData?.items, activeAddress, sismoPolygonBadgeContract]);

  useEffect(() => {
    if (playgroundEnvData?.items && playgroundMintedBadgeIds) {
      playgroundMintedBadgeIds.map(async (badgeId) => {
        const badgeData = await playgroundEnvData.items.find(
          (token) => token.collectionId === badgeId
        );

        if (badgeData) {
          setPlaygroundBadgesData((playgroundBadgesData) => [
            ...playgroundBadgesData,
            badgeData,
          ]);
        }
      });
    }
  }, [playgroundEnvData, playgroundMintedBadgeIds]);

  /* 
    fetch all non zero curated badge ids & their metadata 
  */

  const [curatedBadgeIds, setCuratedBadgeIds] = useState([]);
  const [curatedBadgesData, setCuratedBadgesData] = useState([]);

  useEffect(() => {
    async function fetchNonZeroTokenBalances() {
      if (curatedEnvData?.items) {
        const nonZeroTokenIds = await Promise.all(
          curatedEnvData?.items.map(async (token) => {
            const balance = await getTokenBalance(
              sismoCuratedBadgeContract,
              activeAddress,
              token.collectionId
            );
            if (balance > 0) {
              return token.collectionId;
            }
            return null;
          })
        );
        const filteredTokenIds = nonZeroTokenIds?.filter(
          (balance) => balance !== null
        );
        setCuratedBadgeIds(filteredTokenIds);
      }
    }

    fetchNonZeroTokenBalances();
  }, [sismoCuratedBadgeContract, activeAddress, curatedEnvData]);

  useEffect(() => {
    if (curatedEnvData?.items && curatedBadgeIds) {
      curatedBadgeIds.map(async (badgeId) => {
        const badgeData = await curatedEnvData.items.find(
          (token) => token.collectionId === badgeId
        );

        if (badgeData) {
          setCuratedBadgesData((curatedBadgesData) => [
            ...curatedBadgesData,
            badgeData,
          ]);
        }
      });
    }
  }, [curatedEnvData, curatedBadgeIds]);

  return (
    <BadgeSectionWrapper>
      <BadgeSectionHeader>My badges</BadgeSectionHeader>
      <BadgeSectionContent>
        <BadgeProfileHeader
          addressOrEns={ensName || truncatedAddress}
          avatarSrc="./ProfileIcon.png"
          badges={9}
          transactions={19}
        />
        <BadgeListWrapper>
          {playgroundBadgesData?.map((token, i) => (
            <ToolTip
              key={i}
              content={
                <>
                  <p>{token.name}</p>
                  <p>{token.description}</p>
                </>
              }
              placement="right"
            >
              <BadgeImage src={token.image} alt={token.name} />
            </ToolTip>
          ))}
          {curatedBadgesData?.map((token, i) => (
            <ToolTip
              key={i}
              content={
                <>
                  <p>{token.name}</p>
                  <p>{token.description}</p>
                </>
              }
              placement="right"
            >
              <BadgeImage src={token.image} alt={token.name} />
            </ToolTip>
          ))}
        </BadgeListWrapper>
      </BadgeSectionContent>
    </BadgeSectionWrapper>
  );
};
