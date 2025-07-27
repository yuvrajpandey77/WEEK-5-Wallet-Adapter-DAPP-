import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Send, RefreshCw, Shield, Star, Copy, Info, Wallet, LogOut } from "lucide-react";
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

export const Airdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const sendAirdropToUser = async (amount: number) => {
        if (!wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }
        
        setIsLoading(true);
        try {
            await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
            alert(`Airdrop ${amount} SOL to ${wallet.publicKey.toBase58()}`);
        } catch (error) {
            console.error("Airdrop failed:", error);
            alert("Airdrop failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

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
                            <div style={{
                                fontSize: '36px',
                                fontWeight: 'bold',
                                color: 'white',
                                marginBottom: '4px'
                            }}>$0.00</div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                                <span style={{
                                    color: '#9ca3af',
                                    fontSize: '14px'
                                }}>Available Balance</span>
                                <Info size={14} style={{ color: '#9ca3af' }} />
                            </div>
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
                                    <Wallet size={32} style={{ color: '#9ca3af' }} />
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
                                display: 'grid',
                                gridTemplateColumns: 'repeat(5, 1fr)',
                                gap: '16px',
                                marginBottom: '24px'
                            }}>
                                <button style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px',
                                    backgroundColor: '#2563eb',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}>
                                    <Send size={20} style={{ color: 'white' }} />
                                    <span style={{
                                        fontSize: '12px',
                                        color: 'white'
                                    }}>Send</span>
                                </button>
                                <button style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px',
                                    backgroundColor: '#374151',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}>
                                    <div style={{
                                        width: '20px', height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <div style={{
                                            width: '12px', height: '12px',
                                            border: '2px solid white',
                                            borderRadius: '50%'
                                        }}></div>
                                    </div>
                                    <span style={{
                                        fontSize: '12px',
                                        color: 'white'
                                    }}>Swap</span>
                                </button>
                                <button style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px',
                                    backgroundColor: '#374151',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}>
                                    <div style={{
                                        width: '20px', height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <div style={{
                                            width: '12px', height: '12px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%'
                                        }}></div>
                                    </div>
                                    <span style={{
                                        fontSize: '12px',
                                        color: 'white'
                                    }}>Stake</span>
                                </button>
                                <button style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px',
                                    backgroundColor: '#374151',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}>
                                    <div style={{
                                        width: '20px', height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <div style={{
                                            width: '12px', height: '12px',
                                            border: '1px solid white',
                                            borderRadius: '50%'
                                        }}></div>
                                    </div>
                                    <span style={{
                                        fontSize: '12px',
                                        color: 'white'
                                    }}>Bridge</span>
                                </button>
                                <button style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px',
                                    backgroundColor: '#374151',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}>
                                    <div style={{
                                        width: '20px', height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '14px'
                                    }}>$</div>
                                    <span style={{
                                        fontSize: '12px',
                                        color: 'white'
                                    }}>Top Up</span>
                                </button>
                            </div>

                            {/* Security Prompt */}
                            <div style={{
                                backgroundColor: 'rgba(217, 119, 6, 0.2)',
                                border: '1px solid rgba(217, 119, 6, 0.3)',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '24px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}>
                                        <div style={{
                                            width: '24px', height: '24px',
                                            backgroundColor: '#d97706',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <span style={{
                                                color: '#92400e',
                                                fontWeight: 'bold',
                                                fontSize: '12px'
                                            }}>!</span>
                                        </div>
                                        <span style={{
                                            color: 'white',
                                            fontWeight: 500
                                        }}>Protect Your Wallet</span>
                                    </div>
                                    <button style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#d97706',
                                        color: 'white',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s'
                                    }}>
                                        Set Password
                                    </button>
                                </div>
                            </div>

                            {/* Airdrop Section */}
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
                                    marginBottom: '16px'
                                }}>
                                    <h3 style={{
                                        color: 'white',
                                        fontWeight: 600,
                                        margin: 0
                                    }}>Airdrop SOL</h3>
                                    <button style={{
                                        color: '#9ca3af',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '4px'
                                    }}>
                                        <RefreshCw size={16} />
                                    </button>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px',
                                        backgroundColor: 'rgba(55, 65, 81, 0.5)',
                                        borderRadius: '8px'
                                    }}>
                                        <div style={{
                                            width: '40px', height: '40px',
                                            backgroundColor: '#2563eb',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <span style={{
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}>S</span>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                color: 'white',
                                                fontWeight: 500
                                            }}>SOL</div>
                                            <div style={{
                                                color: '#9ca3af',
                                                fontSize: '14px'
                                            }}>$2.9300</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{
                                                color: 'white',
                                                fontWeight: 500
                                            }}>{amount} SOL</div>
                                            <div style={{
                                                color: '#9ca3af',
                                                fontSize: '14px'
                                            }}>${(amount * 2.93).toFixed(4)}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <input 
                                            type="number" 
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value))} 
                                            placeholder="Amount" 
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                backgroundColor: 'rgba(55, 65, 81, 0.5)',
                                                border: '1px solid #4b5563',
                                                borderRadius: '8px',
                                                color: 'white',
                                                fontSize: '16px',
                                                outline: 'none'
                                            }}
                                            min="0.1"
                                            step="0.1"
                                        />
                                        <button 
                                            onClick={() => sendAirdropToUser(amount)}
                                            disabled={isLoading}
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                backgroundColor: '#2563eb',
                                                color: 'white',
                                                borderRadius: '8px',
                                                fontWeight: 500,
                                                border: 'none',
                                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                                opacity: isLoading ? 0.5 : 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                fontSize: '16px'
                                            }}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                                                    <span>Processing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={16} />
                                                    <span>Send Airdrop</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

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
                    {wallet.publicKey && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            padding: '16px 0',
                            borderTop: '1px solid rgba(55, 65, 81, 0.5)'
                        }}>
                            <button style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#60a5fa',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}>
                                <div style={{
                                    width: '24px', height: '24px',
                                    backgroundColor: '#2563eb',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div style={{
                                        width: '12px', height: '12px',
                                        backgroundColor: 'white',
                                        borderRadius: '2px'
                                    }}></div>
                                </div>
                                <span style={{ fontSize: '12px' }}>Home</span>
                            </button>
                            <button style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#9ca3af',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
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
                                        width: '12px', height: '12px',
                                        border: '1px solid #9ca3af',
                                        borderRadius: '2px'
                                    }}></div>
                                </div>
                                <span style={{ fontSize: '12px' }}>NFT</span>
                            </button>
                            <button style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#9ca3af',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}>
                                <div style={{
                                    width: '24px', height: '24px',
                                    backgroundColor: '#374151',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{
                                        color: '#9ca3af',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>$</span>
                                </div>
                                <span style={{ fontSize: '12px' }}>$MOON</span>
                            </button>
                            <button style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#9ca3af',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
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
                                        width: '12px', height: '12px',
                                        backgroundColor: '#9ca3af',
                                        borderRadius: '50%'
                                    }}></div>
                                </div>
                                <span style={{ fontSize: '12px' }}>History</span>
                            </button>
                            <button style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#9ca3af',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}>
                                <div style={{
                                    width: '24px', height: '24px',
                                    backgroundColor: '#374151',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{
                                        color: '#9ca3af',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>A</span>
                                </div>
                                <span style={{ fontSize: '12px' }}>Explore</span>
                            </button>
                        </div>
                    )}
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