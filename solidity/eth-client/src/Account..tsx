import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { TotalBalance } from './ TotalBalance'
import UserBalance from './UserBalance'

export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    return (
        <>

            <div>
                {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
                {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
                <button onClick={() => disconnect()}>Disconnect</button>
            </div>
            <div>
                <TotalBalance/>
                <UserBalance/>
            </div>
        </>

    )
}