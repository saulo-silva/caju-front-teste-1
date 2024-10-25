import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Form = styled.form`
  display: flex;
  gap: 26px;
  div {
      max-width: 250px;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  gap: 16px;
`;
