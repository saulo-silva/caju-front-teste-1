import Router from "~/router";
import styled from "styled-components";
import { Header } from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from 'styled-react-modal'
import LoadingOverlay from "~/components/LoadingOverlay";

const queryClient = new QueryClient();

// const SpecialModalBackground = styled.div`
//   display: flex;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   z-index: 30;
//   opacity: ${props => props.opacity};
//   background-color: green;
// `

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <Header>
            <h1>Caju Front Teste</h1>
          </Header>
          <LoadingOverlay />
          <Router />
        </ModalProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
