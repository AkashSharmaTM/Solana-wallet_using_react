import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export const SendToken = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [senderAddress, setSenderAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSendToken = async () => {
    if (!connection || !publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const senderPublicKey = new PublicKey(senderAddress);
      const recipientPublicKey = new PublicKey(recipientAddress);
      const lamports = parseFloat(amount) * 1_000_000_000; 

      if (isNaN(lamports) || lamports <= 0) {
        alert("Please enter a valid amount of SOL to send.");
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: recipientPublicKey,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      console.log("Transaction Signature:", signature);
      alert(`Transaction Sent! Signature: ${signature}`);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Check console for details.");
    }
  };

  return (
    <div className={styles.sendTokenContainer}>
      <h3>Send SOL Token</h3>
      <input
        type="text"
        placeholder="Sender Phantom Address"
        value={senderAddress}
        onChange={(e) => setSenderAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Recipient Phantom Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSendToken}>Send Token</button>
    </div>
  );
};
