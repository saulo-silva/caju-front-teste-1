import styled from "styled-components";
import { IconButtonStyled } from "@/components/Buttons/IconButton";
import Button from "@/components/Buttons";


export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Form = styled.form`
  border: 2px solid #f0f0f0;
  width: 500px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 16px; 
  ${IconButtonStyled} {
    margin-bottom: 8px;
    align-items: flex-start;
  }

  ${Button}{
    align-self: flex-end;
  }
`;
