import React from "react";
import { ButtonContainer } from "./Button.styles";

export type ButtonProps = {
  onClick?: any;
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export const Button = ({
  onClick,
  children,
  variant = "primary",
  disabled,
}: ButtonProps) => {
  return (
    <ButtonContainer onClick={onClick} variant={variant} disabled={disabled}>
      {children}
    </ButtonContainer>
  );
};
