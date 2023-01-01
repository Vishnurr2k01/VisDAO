import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getInfo, getProposal, getProposals, isWalletConnected } from './Blockchain.services'
import About from './components/About'
import Home from './views/Home'
import Proposal from './views/Proposal'

const App = () => {

  const [loaded,setLoaded] = useState(false)

  useEffect(async()=>{
    await isWalletConnected()
    await getInfo()
    await getProposals()
    setLoaded(true)
  },[])
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#212936] dark:text-gray-300">
     {
      loaded ? ( <Routes>
        <Route path="/" element={<Home />} />
        <Route path="proposal/:id" element={<Proposal />} />
        <Route path="/about" element={<About />}/>
      </Routes>) : <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-300"></div>
      </div>

     }
    </div>
  )
}

export default App