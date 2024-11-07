import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Celo } from "@thirdweb-dev/chains";

// Custom Celo Alfajores configuration
const CeloAlfajores = {
  ...Celo,
  chainId: 44787, // Celo Alfajores chainId
  name: "Celo Alfajores",
  rpc: ["https://alfajores-forno.celo-testnet.org"],
  nativeCurrency: {
    name: "Celo",
    symbol: "CELO",
    decimals: 18,
  },
  testnet: true,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={CeloAlfajores} clientId={process.env.REACT_APP_THIRDWEB_CLIENT_ID}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);