import React from 'react';
import './polyfills';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThirdwebProvider } from "@thirdweb-dev/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain="celo-alfajores" clientId={process.env.REACT_APP_THIRDWEB_CLIENT_ID}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);