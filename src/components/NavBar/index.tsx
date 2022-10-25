import { NavbarContainer, NavButtonContainer } from "./NavBar.styles";
import { Logo } from "../Logo";
import { Button } from "../primitives";
import { FaTimes } from "react-icons/fa";
import { useWallet } from "../../wallet";
import { useOnboard } from "../../wallet/hooks";
import { truncateAddress } from "../../lib/utils";
import { useENS } from "../../lib/hooks";

const NavButton = ({ leftIcon, label, rightIcon, onClick }) => {
  return (
    <NavButtonContainer>
      <div>{leftIcon}</div>
      {label}
      <div onClick={onClick}>{rightIcon}</div>
    </NavButtonContainer>
  );
};

export const NavBar = () => {
  const wallet = useWallet();
  const { disconnect, connectedList } = useOnboard();

  const activeAddress = connectedList[0]?.accounts[0].address;

  const { ensName } = useENS(activeAddress);
  return (
    <NavbarContainer>
      <Logo />
      {wallet?.isConnected ? (
        <NavButton
          leftIcon={
            <img
              src="./ZIKIICon.svg"
              alt="ZIKI Icon"
              width="22px"
              height="28px"
            />
          }
          label={ensName || truncateAddress(activeAddress)}
          rightIcon={<FaTimes size={18} />}
          onClick={disconnect}
        />
      ) : (
        <Button disabled>Not Connected</Button>
      )}
    </NavbarContainer>
  );
};
