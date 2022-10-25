import styled from "styled-components";

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: flex-start;
`;

export const CheckboxWrapperLabel = styled.label`
  cursor: pointer;
  margin-left: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 150%;
  color: #e9ecff;
`;

export const CheckboxIcon = styled.div`
  display: inline-block;
`;

export const UnselectedCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 7px;
`;

export const SelectedCheckbox = styled.div<any>`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 11.31px;
  height: 11.31px;

  background: ${(props) => (props.checked ? "#1a1f34" : "#3F4973")};

  padding: 4px;
  border-radius: 3px;
  transition: all 150ms;

  ${CheckboxIcon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;
