import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import { Wallet } from '@project-serum/anchor';
import bs58 from 'bs58';

const secretKey = bs58.decode(process.env.PRIVATE_KEY || '');
const wallet = new Wallet(Keypair.fromSecretKey(secretKey));

const connection = new Connection('https://api.mainnet-beta.solana.com');

async function main() {
  // 1. Fetch quote
  const quoteResponse = await fetch(
    'https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112' +
    '&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' +
    '&amount=1000000' +
    '&slippageBps=50'
  );
  const finalQuote = await quoteResponse.json();
  console.log('Quote:', finalQuote);

  // 2. Fetch swap transaction
  const swapResponse = await fetch('https://quote-api.jup.ag/v6/swap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quoteResponse: finalQuote,
      userPublicKey: wallet.publicKey.toString(),
      wrapAndUnwrapSol: true,
    }),
  });

  const { swapTransaction } = await swapResponse.json();

  // 3. Deserialize transaction
  const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
  let transaction = VersionedTransaction.deserialize(swapTransactionBuf);

  // 4. Sign
  transaction.sign([wallet.payer]);

  // 5. Send
  const latestBlockHash = await connection.getLatestBlockhash();
  const rawTransaction = transaction.serialize();
  const txid = await connection.sendRawTransaction(rawTransaction, {
    skipPreflight: true,
    maxRetries: 2,
  });

  await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: txid,
  });

  console.log(`Success: https://solscan.io/tx/${txid}`);
}

main().catch(console.error);
