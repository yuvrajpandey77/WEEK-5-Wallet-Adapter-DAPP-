import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export const RequestAirdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState<string>("1");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const requestAirdrop = async () => {
        if (!wallet.connected || !wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }
        const parsed = parseFloat(amount);
        if (!amount || isNaN(parsed) || parsed <= 0) {
            alert("Please enter a valid amount!");
            return;
        }
        try {
            setIsLoading(true);
            await connection.requestAirdrop(wallet.publicKey, Math.round(parsed * LAMPORTS_PER_SOL));
            alert(`Airdrop of ${parsed} SOL requested! Check your wallet.`);
        } catch (error) {
            console.error("Airdrop failed:", error);
            alert("Airdrop failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                marginBottom: '20px', 
                color: '#ffffff'
            }}>
                Request Airdrop
            </h2>

            <div style={{ marginBottom: '24px' }}>
                <input 
                    type="number" 
                    placeholder="Amount in SOL..."
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'rgba(55, 65, 81, 0.5)',
                        border: '1px solid #4b5563',
                        borderRadius: '8px',
                        color: 'white',
                        marginBottom: '16px'
                    }}
                    min={0.1}
                    step={0.1}
                />

                <button 
                    onClick={requestAirdrop}
                    disabled={!wallet.connected || isLoading}
                    style={{ 
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        borderRadius: '8px',
                        fontWeight: 500,
                        border: 'none',
                        cursor: (!wallet.connected || isLoading) ? 'not-allowed' : 'pointer',
                        opacity: (!wallet.connected || isLoading) ? 0.5 : 1
                    }}
                >
                    {isLoading ? 'Processing...' : 'Request Airdrop'}
                </button>
            </div>

            {wallet.connected ? (
                <div style={{ 
                    padding: '16px', 
                    background: '#0d1117', 
                    borderRadius: '8px',
                    border: '1px solid #30363d',
                    marginTop: '20px'
                }}>
                    <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#8b949e', 
                        marginBottom: '8px' 
                    }}>
                        Connected Wallet:
                    </p>
                    <p style={{ 
                        fontSize: '0.75rem', 
                        color: '#58a6ff', 
                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                        background: '#161b22',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #30363d'
                    }}>
                        {wallet.publicKey?.toBase58()}
                    </p>
                </div>
            ) : (
                <div style={{ 
                    padding: '16px', 
                    background: '#0d1117', 
                    borderRadius: '8px',
                    border: '1px solid #30363d',
                    marginTop: '20px'
                }}>
                    <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#8b949e' 
                    }}>
                        Please connect your wallet to request an airdrop
                    </p>
                </div>
            )}
        </div>
    );
};


