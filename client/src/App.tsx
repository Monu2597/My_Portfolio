import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import "@fontsource/inter";
import Portfolio from "./components/Portfolio";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePortfolio } from "./lib/stores/usePortfolio";

const queryClient = new QueryClient();

function App() {
  const { initialize } = usePortfolio();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ width: '100vw', minHeight: '100vh', position: 'relative' }}>
        <Portfolio />
      </div>
    </QueryClientProvider>
  );
}

export default App;
