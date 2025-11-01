import "@/styles/globals.css";
import '../styles/fonts.css';
import type { AppProps } from "next/app";
import { WagmiProvider, createConfig, http } from "wagmi";
import {base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Create a QueryClient instance
const queryClient = new QueryClient();
const wagmiConfig = createConfig({
  chains: [base], // You can replace this with other chains like MAINNET, GOERLI, etc.
  connectors: [
    coinbaseWallet({
      appName: "onchainkit", // Customize your app name
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    // Wrap your app with both WagmiProvider and QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <Component {...pageProps} />
      </WagmiProvider>
    </QueryClientProvider>
  );
}