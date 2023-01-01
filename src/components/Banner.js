import { useState } from 'react'
import { setGlobalState, useGlobalState } from '../store'
import {performContribute} from '../Blockchain.services'
import { toast } from 'react-toastify'

const Banner = () => {
  const [amount,setAmount] = useState("")
  const [isStakeholder] = useGlobalState('isStakeholder')
  const [balance] = useGlobalState('balance')
  const [mybalance] = useGlobalState('mybalance')
  const [proposal] = useGlobalState('proposals')
   
  const getOpened = ()=>{
    return proposal.filter(()=>new Date().getTime() > Number(proposal.duration)+'000').length
  }
  





  const onContribute = async () => {
    if(!!!amount || amount == "")return
    await performContribute(amount)
    toast.success("Transaction successful")
  }
  return (
    <div className="p-8">
      <h2 className="font-semibold text-3xl mb-5">
      A DAO like no other
      

      </h2>
      
      <hr className="my-6 border-gray-300 dark:border-gray-500" />
      <p>
        This is a build one out of many <span className="font-bold">DAO</span>{' '}
        applications scheduled to show up on this platform.
      </p>
      <div className="flex flex-row justify-start items-center md:w-1/3 w-full mt-4">
        <input
          type="number"
          className="form-control block w-full px-3 py-1.5
          text-base font-normaltext-gray-700
          bg-clip-padding border border-solid border-gray-300
          rounded transition ease-in-out m-0 shadow-md
          focus:text-gray-500 focus:outline-none
          dark:border-gray-500 dark:bg-transparent"
          placeholder="e.g 2.5 Eth"
          onChange={(e)=>setAmount(e.target.value)}
          value={amount}
          required
        />
      </div>
      <div
        className="flex flex-row justify-start items-center mt-4"
        role="group"
      >
        <button
          type="button"
          className="p-2 border-[1px] rounded-xl font-bold shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 border-blue-400"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={onContribute}
        >
          Contribute +
        </button>
        {isStakeholder ? (
          <button
          type="button"
          className="ml-4 p-2 border-[1px] rounded-xl font-bold shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 border-blue-400"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={() => setGlobalState('createModal', 'scale-100')}
        >
          Propose
        </button>
        ) : null}
      </div>
      <hr className="my-6 border-gray-300 dark:border-gray-500" />
      <div className="">
<p>DAO Balance :<strong> {balance} ETH</strong></p>
<p>Your Contributions : <strong> {mybalance} ETH</strong> </p>
{isStakeholder ? <p>Your are a stakeholder</p> : null}
      </div>
    </div>
  )
}

export default Banner