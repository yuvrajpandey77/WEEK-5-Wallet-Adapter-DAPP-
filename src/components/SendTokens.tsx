import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

export const SendTokens = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [to, setTo] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendToken = async () => {
        if (!wallet.connected || !wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }
        if (!to || !amount) {
            alert("Please fill in all fields!");
            return;
        }
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            alert("Please enter a valid amount!");
            return;
        }
        try {
            setIsLoading(true);
            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(to),
                lamports: Math.round(parsedAmount * LAMPORTS_PER_SOL),
            }));
            await wallet.sendTransaction(transaction, connection);
            alert(`Successfully sent ${parsedAmount} SOL to ${to}`);
            setTo("");
            setAmount("");
        } catch (error: any) {
            console.error('Transaction failed:', error);
            alert(`Transaction failed: ${error?.message ?? 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const isDisabled = !wallet.connected || isLoading || !to || !amount;

    return (
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                marginBottom: '20px', 
                color: '#ffffff'
            }}>
                Send SOL Tokens
            </h2>

            <div style={{ marginBottom: '24px' }}>
                <input 
                    type="text" 
                    onChange={(e) => setTo(e.target.value)} 
                    value={to} 
                    placeholder="Recipient Address..."
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'rgba(55, 65, 81, 0.5)',
                        border: '1px solid #4b5563',
                        borderRadius: '8px',
                        color: 'white',
                        marginBottom: '16px'
                    }}
                />
                
                <input 
                    type="number" 
                    onChange={(e) => setAmount(e.target.value)} 
                    value={amount}  
                    placeholder="Amount in SOL..."
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'rgba(55, 65, 81, 0.5)',
                        border: '1px solid #4b5563',
                        borderRadius: '8px',
                        color: 'white',
                        marginBottom: '16px'
                    }}
                    min={0.000001}
                    step={0.000001}
                />
                
                <button 
                    onClick={sendToken}
                    disabled={isDisabled}
                    style={{ 
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        borderRadius: '8px',
                        fontWeight: 500,
                        border: 'none',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        opacity: isDisabled ? 0.5 : 1
                    }}
                >
                    {isLoading ? 'Sending...' : 'Send SOL'}
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
                        Please connect your wallet to send tokens
                    </p>
                </div>
            )}
        </div>
    );
};


