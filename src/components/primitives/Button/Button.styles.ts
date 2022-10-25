import styled, { css } from "styled-components";
import { ButtonProps } from ".";

const VARIANT = {
  primary: css`
    color: #e9ecff;
    background: #c08aff;
  `,
  secondary: css`
    color: #e9ecff;
    background: #3f4973;
  `,
};

const DISABLED = css`
  cursor: not-allowed;
  background: #3f4973;
  opacity: 0.5;
  color: #f5f5f5;
`;

export const ButtonContainer = styled.button<ButtonProps>`
  padding: 8px 18px;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  font-weight: 500;
  font-size: 14px;
  line-height: 150%;

  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
  text-align: center;
  height: 52px;

  &:hover:not(:disabled) {
    background-color: #d7b2ff;
  }

  ${(props) => props.variant && VARIANT[props.variant]}
  ${(props) => props.disabled && DISABLED}
`;
