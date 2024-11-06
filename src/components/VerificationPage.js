import React, { useState, useEffect } from 'react';
import { useAddress, useDisconnect, useMetamask, useWalletConnect, useSignMessage } from "@thirdweb-dev/react";

function VerificationPage() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const signMessage = useSignMessage();
  
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const [showRefresh, setShowRefresh] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setStatus('Invalid verification link. Please try again.');
    }
  }, []);

  const verifyNFT = async () => {
    if (!address) {
      setStatus('Please connect your wallet first.');
      return;
    }

    try {
      setStatus('Signing message...');
      const message = `Verify SpaceM Node ownership. Token: ${token}`;
      const signature = await signMessage(message);

      setStatus('Verifying...');
      const response = await fetch(`${process.env.REACT_APP_WORKER_URL}/submit-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, address, signature }),
      });

      const result = await response.json();
      console.log("Verification result:", result);

      if (result.success) {
        setStatus(result.message);
        setShowRefresh(false);
      } else {
        setStatus(result.error);
        setShowRefresh(true);
      }
    } catch (error) {
      console.error('Error in verifyNFT:', error);
      setStatus('Failed to verify: ' + error.message);
    }
  };

  const refreshStatus = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_WORKER_URL}/check-verification?token=${token}`);
      const result = await response.json();
      console.log("Refresh status result:", result);
      if (result.success) {
        setStatus(result.message);
        setShowRefresh(false);
      } else {
        setStatus(result.error);
      }
    } catch (error) {
      console.error('Error in refreshStatus:', error);
      setStatus('Failed to check verification status: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Verify SpaceM Node NFT Ownership</h1>
      {!address ? (
        <>
          <button style={styles.button} onClick={connectWithMetamask}>Connect with MetaMask</button>
          <button style={styles.button} onClick={connectWithWalletConnect}>Connect with WalletConnect</button>
        </>
      ) : (
        <>
          <p>Connected: {address}</p>
          <button style={styles.button} onClick={disconnect}>Disconnect</button>
          <button style={styles.button} onClick={verifyNFT}>Verify NFT Ownership</button>
        </>
      )}
      {showRefresh && <button style={styles.button} onClick={refreshStatus}>Refresh Status</button>}
      <div style={styles.status}>{status}</div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  title: {
    color: '#333',
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  status: {
    marginTop: '1rem',
    fontWeight: 'bold',
  },
};

export default VerificationPage;