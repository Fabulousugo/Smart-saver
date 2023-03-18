import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { Account } from './components'
import Navbar    from './pages/Navbar'
import SmartSaver from './pages/SmartSaver'

export function App() {
  const { isConnected } = useAccount()
  return (
    <>
      {/* <h1>wagmi + RainbowKit + Vite</h1> */}
      <Navbar/>
      <SmartSaver/>

      {/* <ConnectButton />
      {isConnected && <Account />} */}
    </>
  )
}
