import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./utils/theme";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes";
import LoadingSpinner from "./components/loading";
import { QueryClient } from "@tanstack/react-query";
import {
  removeOldestQuery,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import React from "react";
import { ToastContainer } from "react-toastify";
import { SelectContextProvider } from "./context/SelectContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ReportsContextProvider } from "./context/ReportsContext";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24,
      },
    },
  });
  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
    retry: removeOldestQuery,
  });

  return (
    <React.StrictMode>
      <AuthContextProvider>
        <ReportsContextProvider>
          <SelectContextProvider>
            <PersistQueryClientProvider
              client={queryClient}
              persistOptions={{ persister: localStoragePersister }}
            >
              <ChakraProvider theme={customTheme}>
                <RouterProvider
                  router={AppRouter}
                  fallbackElement={<LoadingSpinner />}
                />
                <ToastContainer theme="colored" />
              </ChakraProvider>
            </PersistQueryClientProvider>
          </SelectContextProvider>
        </ReportsContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  );
}

export default App;
