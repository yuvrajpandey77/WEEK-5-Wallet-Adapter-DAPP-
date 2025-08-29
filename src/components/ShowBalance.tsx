import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";

export const ShowBalance = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [balance, setBalance] = useState<string>("0");

    const refreshBalance = useCallback(async () => {
        if (!wallet.publicKey) {
            setBalance("0");
            return;
        }
        try {
            const lamports = await connection.getBalance(wallet.publicKey);
            setBalance((lamports / LAMPORTS_PER_SOL).toString());
        } catch (e) {
            setBalance("0");
        }
    }, [connection, wallet.publicKey]);

    useEffect(() => {
        refreshBalance();
        // Also refresh on account change
        const subId = wallet.publicKey ? connection.onAccountChange(wallet.publicKey, () => {
            refreshBalance();
        }) : null;
        return () => {
            if (subId !== null) {
                connection.removeAccountChangeListener(subId);
            }
        };
    }, [connection, wallet.publicKey, refreshBalance]);

    return (
        <div style={{ color: 'white', fontSize: '14px' }}>
            Balance: <span>{balance}</span> SOL
        </div>
    );
};


