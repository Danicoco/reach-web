import "@ant-design/flowchart/dist/index.css";
import { QueryClient, QueryClientProvider } from "react-query";

import PrivateRoutes from "./routing/routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  },
});

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PrivateRoutes />
      </QueryClientProvider>
    </>
  );
};

export default App;
