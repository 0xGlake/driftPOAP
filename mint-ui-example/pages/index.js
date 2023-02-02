import styles from '../styles/Home.module.css'
import { useMemo, useState, useEffect } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { MetaplexProvider } from '../components/MetaplexProvider';
import { MintNFTs } from '../components/MintNFTs';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Home() {

  const [network, setNetwork] = useState(WalletAdapterNetwork.Mainnet);
  
  const endpoint = useMemo(() => process.env.NEXT_PUBLIC_RPC_URL, [network]); // eslint-disable-next-line no-use-before-define


  const wallets = useMemo(
      () => [
          new PhantomWalletAdapter(),
          new GlowWalletAdapter(),
          new SlopeWalletAdapter(),
          new SolflareWalletAdapter({ network }),
          new TorusWalletAdapter(),
      ],
      [network]
  );

  const handleChange = (event) => {
    switch(event.target.value){
      case "mainnet":
        setNetwork(WalletAdapterNetwork.Mainnet);
      break;
      case "devnet":
        setNetwork(WalletAdapterNetwork.Devnet);
        break;
      case "testnet":
        setNetwork(WalletAdapterNetwork.Testnet);
        break;
      default:
        setNetwork(WalletAdapterNetwork.Mainnet);
        break;
    }
  };

  return (
    <div>
      <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
        <MetaplexProvider>
          <div className={styles.App}>
            <WalletMultiButton />
            <MintNFTs onClusterChange={handleChange} />
          </div>
        </MetaplexProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </div>
  );
}
