import NiceModal from "@ebay/nice-modal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from 'styled-react-modal'
import { Toaster } from 'sonner'

import { Header } from "./components/Header";
import LoadingOverlay from "@/components/LoadingOverlay";

import Router from "@/router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <NiceModal.Provider>
            <Header>
              <h1>Caju Front Teste</h1>
            </Header>
            <LoadingOverlay />
            <Router />
            <Toaster />
          </NiceModal.Provider>
        </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
