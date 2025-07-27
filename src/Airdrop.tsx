import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

    export const Airdrop = () => {
    const wallet = useWallet();
    const {connection } = useConnection();
    const [props, setProps] = useState(0);
    const  sendAirdropToUser = async (props:string | number) => {
        await connection.requestAirdrop(wallet.publicKey!,Number(props) * LAMPORTS_PER_SOL);       
        alert(`Airdrop sol ${props} to ${wallet.publicKey?.toBase58()}`);
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <input type="text"  onChange={(e) => setProps(Number(e.target.value))} placeholder="Amount" style={{padding: "10px 20px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px"}} />
            <button  onClick={() => sendAirdropToUser(props)} style={{backgroundColor: "blue", color: "white", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Send Airdrop</button>
        </div>
    )
}