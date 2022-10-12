import { Contract } from "ethers";
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { JsonRpcSigner, InfuraProvider } from "@ethersproject/providers";

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is not optional
export function getSigner(
  library: InfuraProvider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: InfuraProvider,
  account?: string
): InfuraProvider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export function getContract(
  address: string,
  ABI: any,
  library: InfuraProvider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  );
}

export function getTokenBalance(
  contract: Contract,
  address: string,
  tokenId: number
) {
  const balance = contract.balanceOf(address, tokenId);

  return balance;
}

export const getTokens = (
  contract: Contract,
  address: string,
  tokenIds: number[]
) => {
  tokenIds.map(async (tokenId) => {
    const balance = await contract.balanceOf(address, tokenId);

    let token = { balance: Number(balance), tokenId: tokenId };
    console.log("token from the map function:", token);

    return token;
  });
};

export const cleanAddress = (addr: string | undefined) => {
  if (!addr) {
    return null;
  }
  if (addr.includes(".eth")) {
    return addr.slice(0, addr.length - 4);
  }
  return addr;
};

export const truncateAddress = (addr: string): string =>
  `${addr?.slice(0, 6)}...${addr.slice(-4)}`;
