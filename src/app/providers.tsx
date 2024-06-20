"use client";

import "@fontsource/inter";
import "@fontsource/quicksand";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/lib/context/user";

const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
    title: "Quicksand, sans-serif",
  },
  breakpoints: {
    base: "0em",
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
});

const queryClient = new QueryClient();

queryClient.invalidateQueries({ queryKey: ["projects:favorite"] });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <UserProvider>{children}</UserProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
