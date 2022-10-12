import { NavbarContainer } from "./NavBar.styles";
import { Logo } from "../Logo";
import { Button } from "../primitives";
import { useWallet } from "../../wallet";

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: "primary" | "secondary";
  disabled?: boolean;
};

export const NavBar = () => {
  const wallet = useWallet();
  return (
    <NavbarContainer>
      <Logo />
      {wallet.isConnected ? (
        <Button variant="secondary">Connected</Button>
      ) : (
        <Button disabled>Not Connected</Button>
      )}
    </NavbarContainer>
  );
};
