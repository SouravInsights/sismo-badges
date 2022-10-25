import {
  CheckboxWrapper,
  CheckboxWrapperLabel,
  CheckboxIcon,
  SelectedCheckbox,
  UnselectedCheckbox,
} from "./Checkbox.styles";
import { FaCheck } from "react-icons/fa";

export type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: any;
};

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <CheckboxWrapper>
      <UnselectedCheckbox checked={checked} onChange={onChange} />
      <SelectedCheckbox checked={checked}>
        <CheckboxIcon>
          <FaCheck color="white" fontSize="12px" />
        </CheckboxIcon>
      </SelectedCheckbox>
      <CheckboxWrapperLabel>{label}</CheckboxWrapperLabel>
    </CheckboxWrapper>
  );
};
