import { formatUnits } from 'ethers'
import { useReadContract } from 'wagmi'

export function TotalBalance() {
  const { data: totalSupply, isLoading, error } = useReadContract({
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
    abi: [
      {
        name: "totalSupply",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }]
      }
    ],
    functionName: "totalSupply",
  })

  const { data: decimals } = useReadContract({
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    abi: [
      {
        name: "decimals",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint8" }]
      }
    ],
    functionName: "decimals",
  })

  const supply = totalSupply ? Number(totalSupply) : 0
  const decimal = decimals ? Number(decimals) : 0
//   const normalizedSupply = supply / 10 ** decimal
const normalizedSupply = totalSupply ? formatUnits(totalSupply, decimals) : "0";


  return (
    <div>
      <p>Total supply (raw): {supply}</p>
      <p>Decimals: {decimal}</p>
      <p>Total Supply (formatted): {normalizedSupply}</p>
    </div>
  )
}
