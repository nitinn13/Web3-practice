import React from 'react'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const App = () => {
  const getBalance = async () => {
    try {
      const balance = await client.getBalance({
        address: '0xc676E2559E9B8a4B184dd3d1c7001739e597D828',
      })
      console.log("Raw balance (wei):", balance)
      const eth = Number(balance) / 1e18
      console.log("Balance in ETH:", eth)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <button onClick={getBalance}>Get Balance</button>
    </div>
  )
}

export default App
