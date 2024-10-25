import { forwardRef, SelectHTMLAttributes } from "react";
import styled from "styled-components";
import ErrorMessage from "~/components/ErrorMessage";

export const Select = styled.select`
  padding: 0 8px;
  margin-top: 8px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;
  :focus {
    outline: none;
    border: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
  }
`;

type Props = {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

const SelectField = forwardRef<HTMLSelectElement, Props>(({ label, error, id, options, ...rest }, ref) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <Select ref={ref} id={id} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
});

export default SelectField;
