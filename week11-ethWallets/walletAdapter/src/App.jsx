import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, useBalance, useSendTransaction, WagmiProvider } from 'wagmi'
import { config } from './config'
import {  useConnect } from 'wagmi'



const queryClient = new QueryClient()


const App = () => {

  // const { address } = useAccount();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Send/>
        <WalletOptions/>
        <Address/>
      </QueryClientProvider>
    </WagmiProvider>

  )
}

export default App


function Address() {
  const { address } = useAccount()

  const balance = useBalance({address})
  return (
    <>
    
  <div>Address: {address}</div>
  <div>Balance: {balance?.data?.formatted}</div>
  </>
  )
}

function WalletOptions() {

  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

function Send() {
  const { address } = useAccount()
    const { data: hash , sendTransaction } = useSendTransaction()
  const [add, setadd] = useState("")

    const send =  () => {
      const tx =  sendTransaction({
        to: add,
        value: 100,
      })
      console.log(tx)
    }

  return(
     <div>
          <input type="text" placeholder='Address' value={add} onChange={(e) => setadd(e.target.value)}/>
          <button onClick={send}>Send</button>
          {/* <div>Address: {address}</div> */}
        </div>
  )
}