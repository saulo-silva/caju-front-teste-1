import styled from "styled-components";
const registrationStatusStyles: Record<string, { background: string; title: string }> = {
  REVIEW: {
    background: "#FDF8E9",
    title: "#5D3E09",
  },
  APPROVED: {
    background: "#EEEEFD",
    title: "#4242DF",
  },
  REPROVED: {
    background: "#FBEDF6",
    title: "#CE2893",
  },
};
type RegistrationStatus = keyof typeof registrationStatusStyles;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;
`;

export const Column = styled.div<{ $status: RegistrationStatus }>`
  height: auto;
  background-color: ${({ $status }) =>
    registrationStatusStyles[$status].background};
  border-radius: 8px;
  min-height: 80vh;
  max-height: 80vh;
`;

export const TitleColumn = styled.h2<{ $status: RegistrationStatus }>`
  color: ${({ $status }) => registrationStatusStyles[$status].title};
  margin: 24px;
`;

export const ColumnContent = styled.div`
  overflow: auto;
  max-height: 85%;
`;
