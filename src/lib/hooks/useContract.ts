import { useMemo } from "react";
import { Contract, ethers } from "ethers";

import SismoBadgeJson from "../abis/BadgesABI.json";
import { getContract } from "../utils";
import { useOnboard } from "../../wallet/hooks/useOnboard";
import { Badges } from "../typechain/BadgesType";

function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { activeAddress } = useOnboard();

  return useMemo(() => {
    const provider: any = new ethers.providers.InfuraProvider(
      137,
      process.env.INFURA_KEY
    );
    if (!address || !ABI || !provider) return null;
    try {
      return getContract(
        address,
        ABI,
        provider,
        withSignerIfPossible && activeAddress ? activeAddress : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, withSignerIfPossible, activeAddress]) as T | null;
}

export function useSismoBadgeContract(
  contractAddress: string,
  withSignerIfPossible?: boolean
): Badges | null {
  return useContract(contractAddress, SismoBadgeJson, withSignerIfPossible);
}
