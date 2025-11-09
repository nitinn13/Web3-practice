import type { Address } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

const UserBalance = () => {
    const { address } = useAccount()
    const { data : userBalance } = useReadContract({
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        abi: [
            {
                "constant": true,
                "inputs": [{ "name": "who", "type": "address" }],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
        ],
        functionName: "balanceOf",
        args: [address as Address]

    })
    return (
        <div>
            User Balance {userBalance}
        </div>
    )
}

export default UserBalance