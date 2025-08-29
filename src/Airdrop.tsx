import { useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react";
import { RequestAirdrop } from "./components/RequestAirdrop";
import { SendTokens } from "./components/SendTokens";
import { ShowBalance } from "./components/ShowBalance";
import { Send, ArrowDownToLine, Star, Copy, Wallet as WalletIcon } from "lucide-react";
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

export const Wallet = () => {
    const wallet = useWallet();
    const [showSend, setShowSend] = useState(false);
    const [showTopUp, setShowTopUp] = useState(false);


    const copyAddress = () => {
        if (wallet.publicKey) {
            navigator.clipboard.writeText(wallet.publicKey.toBase58());
            alert("Address copied to clipboard!");
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Space Background Elements */}
            <div style={{ position: 'absolute', inset: 0 }}>
                {/* Stars */}
                <div style={{
                    position: 'absolute', top: '80px', left: '40px',
                    width: '4px', height: '4px', backgroundColor: 'white',
                    borderRadius: '50%', animation: 'pulse 2s infinite'
                }}></div>
                <div style={{
                    position: 'absolute', top: '160px', right: '80px',
                    width: '4px', height: '4px', backgroundColor: '#93c5fd',
                    borderRadius: '50%', animation: 'pulse 2s infinite 1s'
                }}></div>
                <div style={{
                    position: 'absolute', top: '240px', left: '25%',
                    width: '4px', height: '4px', backgroundColor: 'white',
                    borderRadius: '50%', animation: 'pulse 2s infinite 2s'
                }}></div>
                
                {/* Crescent Moons */}
                <div style={{
                    position: 'absolute', bottom: '80px', left: '40px',
                    width: '64px', height: '64px', backgroundColor: '#60a5fa',
                    borderRadius: '50%', opacity: 0.2
                }}></div>
                <div style={{
                    position: 'absolute', bottom: '80px', left: '24px',
                    width: '64px', height: '64px',
                    background: 'linear-gradient(135deg, #0f172a 0%, #7c3aed 50%, #0f172a 100%)',
                    borderRadius: '50%'
                }}></div>
                
                {/* Nebula Blobs */}
                <div style={{
                    position: 'absolute', top: '25%', left: '25%',
                    width: '128px', height: '128px', backgroundColor: '#8b5cf6',
                    borderRadius: '50%', opacity: 0.1, filter: 'blur(40px)'
                }}></div>
            </div>

            {/* Main Wallet Container */}
            <div style={{
                position: 'relative', zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '16px'
            }}>
                <div style={{
                    width: '100%', maxWidth: '448px',
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(55, 65, 81, 0.5)'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '24px',
                        borderBottom: '1px solid rgba(55, 65, 81, 0.5)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '16px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <div style={{
                                    width: '24px', height: '24px',
                                    backgroundColor: '#374151',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div style={{
                                        width: '12px', height: '2px',
                                        backgroundColor: 'white',
                                        borderRadius: '4px'
                                    }}></div>
                                </div>
                                <div>
                                    <h2 style={{
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '18px',
                                        margin: 0
                                    }}>{wallet.publicKey ? 'thincity393' : 'Wallet'}</h2>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span style={{
                                            color: '#9ca3af',
                                            fontSize: '14px'
                                        }}>{wallet.publicKey ? '(thincity393.sol)' : 'Not Connected'}</span>
                                        {wallet.publicKey && (
                                            <button 
                                                onClick={copyAddress}
                                                style={{
                                                    color: '#9ca3af',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '4px'
                                                }}
                                            >
                                                <Copy size={12} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <span style={{
                                        color: 'white',
                                        fontSize: '14px'
                                    }}>2491ms</span>
                                    <div style={{
                                        width: '8px', height: '8px',
                                        backgroundColor: '#f97316',
                                        borderRadius: '50%'
                                    }}></div>
                                </div>
                                <button style={{
                                    marginTop: '4px',
                                    padding: '4px 12px',
                                    backgroundColor: '#374151',
                                    border: '1px solid #4b5563',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    color: '#d1d5db',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    cursor: 'pointer'
                                }}>
                                    <Star size={10} />
                                    <span>Updates</span>
                                </button>
                            </div>
                        </div>

                        {/* Balance Display */}
                        <div style={{ textAlign: 'center' }}>
                            <ShowBalance />
                        </div>
                    </div>

                    {/* Wallet Connection Section */}
                    {!wallet.publicKey && (
                        <div style={{ padding: '24px' }}>
                            <div style={{
                                backgroundColor: 'rgba(55, 65, 81, 0.5)',
                                borderRadius: '12px',
                                padding: '24px',
                                textAlign: 'center',
                                marginBottom: '24px'
                            }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    backgroundColor: '#374151',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px'
                                }}>
                                    <WalletIcon size={32} style={{ color: '#9ca3af' }} />
                                </div>
                                <h3 style={{
                                    color: 'white',
                                    fontSize: '20px',
                                    fontWeight: 600,
                                    margin: '0 0 8px 0'
                                }}>Connect Your Wallet</h3>
                                <p style={{
                                    color: '#9ca3af',
                                    fontSize: '14px',
                                    margin: '0 0 24px 0',
                                    lineHeight: '1.5'
                                }}>
                                    Connect your Solana wallet to start using the airdrop feature
                                </p>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }}>
                                    <WalletMultiButton style={{
                                        width: '100%',
                                        padding: '16px',
                                        backgroundColor: '#2563eb',
                                        color: 'white',
                                        borderRadius: '12px',
                                        border: 'none',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        transition: 'background-color 0.2s'
                                    }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons - Only show when wallet is connected */}
                    {wallet.publicKey && (
                        <div style={{ padding: '24px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '24px',
                                marginBottom: '24px'
                            }}>
                                <button onClick={() => { setShowSend((s) => !s); setShowTopUp(false); }} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}>
                                    <div style={{
                                        width: '64px', height: '64px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: '0 12px 24px rgba(37,99,235,0.35)',
                                        animation: 'float 3s ease-in-out infinite'
                                    }}>
                                        <Send size={26} style={{ color: 'white' }} />
                                    </div>
                                    <span style={{ fontSize: '13px', color: '#e5e7eb' }}>Send</span>
                                </button>
                                <button onClick={() => { setShowTopUp((t) => !t); setShowSend(false); }} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}>
                                    <div style={{
                                        width: '64px', height: '64px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: '0 12px 24px rgba(147,51,234,0.35)',
                                        animation: 'float 3s ease-in-out 0.5s infinite'
                                    }}>
                                        <ArrowDownToLine size={26} style={{ color: 'white' }} />
                                    </div>
                                    <span style={{ fontSize: '13px', color: '#e5e7eb' }}>Top Up</span>
                                </button>
                            </div>
                            {/* Top Up Panel (Request Airdrop) */}
                            {showTopUp && (
                                <div style={{
                                    backgroundColor: 'rgba(55, 65, 81, 0.5)',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    marginBottom: '24px'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '12px'
                                    }}>
                                        <h3 style={{ color: 'white', fontWeight: 600, margin: 0 }}>Top Up</h3>
                                        <button onClick={() => setShowTopUp(false)} style={{
                                            color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer'
                                        }}>Close</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <RequestAirdrop />
                                    </div>
                                </div>
                            )}

                            {/* Send SOL Panel (toggle) */}
                            {showSend && (
                                <div style={{
                                    backgroundColor: 'rgba(55, 65, 81, 0.5)',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    marginBottom: '24px'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '12px'
                                    }}>
                                        <h3 style={{ color: 'white', fontWeight: 600, margin: 0 }}>Send SOL</h3>
                                        <button onClick={() => setShowSend(false)} style={{
                                            color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer'
                                        }}>Close</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <SendTokens />
                                    </div>
                                </div>
                            )}

                            {/* Disconnect Button */}
                            <div style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '24px'
                            }}>
                                <WalletDisconnectButton style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    backgroundColor: '#dc2626',
                                    color: 'white',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'background-color 0.2s'
                                }} />
                            </div>
                        </div>
                    )}

                    {/* Bottom Navigation - Only show when wallet is connected */}
                    {/* {wallet.publicKey && (
                        <div style={{
                            position: 'sticky',
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0px 0',
                            borderTop: '1px solid rgba(55, 65, 81, 0.5)',
                            backdropFilter: 'blur(8px)'
                        }}>
                            <button style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: 'white',
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '9999px',
                                padding: '8px 14px',
                                cursor: 'pointer',
                                boxShadow: '0 6px 18px rgba(0,0,0,0.25)'
                            }}>
                                <div style={{
                                    width: '10px', height: '10px',
                                    backgroundColor: '#60a5fa',
                                    borderRadius: '3px'
                                }}></div>
                                <span style={{ fontSize: '13px' }}>Home</span>
                            </button>
                        </div>
                    )} */}
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}