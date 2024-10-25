import Router from "~/router";
import { Header } from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingOverlay from "~/components/LoadingOverlay";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <LoadingOverlay />
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
