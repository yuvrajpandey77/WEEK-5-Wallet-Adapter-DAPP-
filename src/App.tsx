import React, {  type FC } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { Airdrop } from './Airdrop';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const App: FC = () => {     
    return (
        <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/hl5Gau0XVV37m-RDdhcRzqCh7ISwmOAe"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <Airdrop />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default App;