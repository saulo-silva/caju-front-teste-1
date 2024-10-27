import { forwardRef, InputHTMLAttributes } from "react";
import styled from "styled-components";

import ErrorMessage from "@/components/ErrorMessage";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
  padding: 0 16px;
  margin-top: 8px;
  vertical-align: middle;
  min-height: 56px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;
  :focus {
    outline: none;
    border: 2px solid #007c89;
    box-shadow: inset 0 0 0 2px #007c89;
  }
  :hover {
    border: 1px solid #007c89;
  }
  :disabled {
    background-color: #f0f0f0;
    border: 1px solid rgba(36, 28, 21, 0.1);
    color: rgba(36, 28, 21, 0.5);
  }
  ::placeholder {
    color: rgba(36, 28, 21, 0.5);
  }
`;

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, Props>(({ label, error, name, ...rest }, ref) => {
  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <Input ref={ref} id={name} {...rest} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
});

export default TextField;
