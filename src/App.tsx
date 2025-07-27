import React, {  type FC } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletConnectButton,
    WalletDisconnectButton,
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { Airdrop } from './Airdrop';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const App: FC = () => {     
    return (
        <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/hl5Gau0XVV37m-RDdhcRzqCh7ISwmOAe"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  <div style ={{display: "flex", flexDirection: "column", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "center", justifyContent: "center", height: "100vh"}}>
                    <WalletMultiButton></WalletMultiButton>
                    <WalletDisconnectButton></WalletDisconnectButton>
                    <Airdrop />
                  </div>
                    {/* <WalletMultiButton /> */}
                    {/* <WalletDisconnectButton /> */}
                    { /* Your app's components go here, nested within the context providers. */ }
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default App;