import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import type { WalletState, ConnectedChain } from "@web3-onboard/core";
import walletConnectModule from "@web3-onboard/walletconnect";
import { useEffect, useState } from "react";
import { logo, icon } from "../assets/onboardAssets";

const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;

const walletConnect = walletConnectModule();

const injected = injectedModule();

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

const web3Onboard = Onboard({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: MAINNET_RPC_URL,
    },
    {
      id: "0x13881",
      token: "ETH",
      label: "Local",
      rpcUrl: "http://localhost:8545",
    },
    {
      id: "0x4",
      token: "rETH",
      label: "Ethereum Rinkeby Testnet",
      rpcUrl: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
    },
    {
      id: "0x89",
      token: "MATIC",
      label: "Polygon Mainnet",
      rpcUrl: " https://polygon-rpc.com",
    },
  ],
  appMetadata: {
    name: "Sismo",
    icon: icon,
    logo: logo,
    description: "Curate your identities with privacy",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
});

export type OnboardHook = {
  isConnected: boolean;
  isDisconnected: boolean;
  connected: WalletState | null;
  connecting: boolean;
  connect: () => Promise<WalletState>;
  disconnect: () => Promise<void>;
  connectedList: WalletState[];
  activeAddress: string | undefined;
  chainId: number | null;
  setChain: any;
  isInjectedWallet: boolean;
};

export const useOnboard = (): OnboardHook => {
  const [wallet, setConnectedWallet] = useState<WalletState>(null);
  const [connecting, setConnecting] = useState(false);
  const [isDisconnected, setWalletDisconnected] = useState(false);
  const [wallets, setConnectedWallets] = useState<WalletState[]>(
    () => web3Onboard.state.get().wallets
  );

  const [connectedChain, setConnectedChain] = useState<ConnectedChain | null>(
    () => {
      const initialWallets = web3Onboard.state.get().wallets;
      if (initialWallets.length === 0) return null;
      return initialWallets[0].chains[0] || null;
    }
  );

  useEffect(() => {
    const subscription = web3Onboard.state
      .select("wallets")
      .subscribe((wallets) => {
        const _wallet = wallets[0];
        _wallet && setConnectedChain(_wallet.chains[0]);
      });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const wallets$ = web3Onboard.state.select("wallets");
    const subscription = wallets$.subscribe(setConnectedWallets);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = web3Onboard.state
      .select("wallets")
      .subscribe((wallets) => {
        if (!wallet) return;
        const updatedWallet = wallets.find(
          ({ label }) => label === wallet.label
        );
        updatedWallet && setConnectedWallet(updatedWallet);
      });
    return () => subscription.unsubscribe();
  }, [wallet]);

  const connect = async () => {
    setConnecting(true);
    const [connectedWallet] = await web3Onboard.connectWallet();
    setConnecting(false);
    setConnectedWallet(connectedWallet || null);
    return connectedWallet;
  };

  const disconnect = async () => {
    const [wallet] = await web3Onboard.state.get().wallets;
    console.log("wallet:", wallet);
    if (!wallet) return;
    setConnecting(true);
    await web3Onboard.disconnectWallet({ label: wallet.label });
    setConnectedWallet(null);
    setConnectedChain(null);
    setConnecting(false);
    setWalletDisconnected(true);
  };

  const setChain = async (network) => {
    await web3Onboard.setChain({ chainId: toHex(network) });
  };

  return {
    isConnected: Boolean(wallets.length > 0),
    isDisconnected,
    connected: wallet,
    connecting,
    connect,
    disconnect,
    connectedList: wallets,
    activeAddress: wallet?.accounts[0].address.toLowerCase(),
    chainId: connectedChain && parseInt(connectedChain.id, 16),
    setChain,
    isInjectedWallet: wallet && wallet.label !== "WalletConnect",
  };
};
