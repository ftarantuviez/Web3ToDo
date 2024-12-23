"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { type ReactNode } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createStorage, http, WagmiProvider } from "wagmi";
import { avalancheFuji } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "ToDo App",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_CLIENT_ID ?? "",
  chains: [avalancheFuji],
  ssr: true,
  transports: {
    [avalancheFuji.id]: http(
      "https://avalanche-fuji-c-chain-rpc.publicnode.com"
    ),
  },
  storage: createStorage({
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  }),
});

export const queryClient = new QueryClient();

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
