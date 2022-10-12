import { useEffect, useState } from "react";
import {
  HeroSectionWrapper,
  HeroSectionContent,
  HeroSectionContentLeft,
  HeroSectionContentHeader,
} from "./HeroSection.styles";
import { Button, Checkbox, Modal } from "../../primitives";

import { useOnboard } from "../../../wallet/hooks";

export const HeroSection = () => {
  const { connect, disconnect, isConnected, chainId, setChain } = useOnboard();
  const [isOpen, setModal] = useState(false);

  const [networkModalIsOpen, setNetworkModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const termsAccepted = async () => {
    setModal(false);
    await connect();
  };

  useEffect(() => {
    if (isConnected && chainId !== 137) {
      setNetworkModal(true);
    }
  }, [isConnected, chainId]);

  const handleNetwork = async () => {
    await setChain(137);
    setNetworkModal(false);
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <HeroSectionWrapper>
      <HeroSectionContent>
        <HeroSectionContentLeft>
          <HeroSectionContentHeader>
            Connect your wallet to see your badges
          </HeroSectionContentHeader>
          <>
            {isConnected ? (
              <Button variant="primary" onClick={() => handleDisconnect()}>
                Disconnect
              </Button>
            ) : (
              <Button variant="primary" onClick={() => setModal(true)}>
                Connect Wallet
              </Button>
            )}
          </>
        </HeroSectionContentLeft>
        <img src="SismoVault.png" alt="sismo vault" />
      </HeroSectionContent>

      <div>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            hideModal={() => setModal(false)}
            title="Disclaimer"
          >
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
              label={
                "By connecting a wallet, you agree to the Terms of Use of this application"
              }
            />
            {checked ? (
              <Button variant="secondary" onClick={() => termsAccepted()}>
                Understood
              </Button>
            ) : (
              <Button disabled onClick={() => termsAccepted()}>
                Understood
              </Button>
            )}
          </Modal>
        )}
        <div>
          <Modal
            hideModal={() => setNetworkModal(false)}
            isOpen={networkModalIsOpen}
            title="Network not supported"
          >
            <p>Please switch to a supported network</p>
            <Button variant="primary" onClick={handleNetwork}>
              Polygon
            </Button>
          </Modal>
        </div>
      </div>
    </HeroSectionWrapper>
  );
};
