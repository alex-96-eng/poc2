"use client";

import { PropsWithChildren } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60, // Cache queries for 1 minute
            refetchOnWindowFocus: false
        }
    },
    queryCache: new QueryCache({})
});

const ReactQueryProvider = ({ children }: PropsWithChildren<{}>) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;

