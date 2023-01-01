import { useEffect ,useState} from 'react'
import Identicon from 'react-identicons'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { truncate } from '../store'
import {getProposals, payoutBeneficiary} from '../Blockchain.services'
import { getGlobalState, useGlobalState } from '../store'


const Proposals = () => {
  const [something] = getGlobalState('proposals')
  

  const [data] = useGlobalState('proposals')
  console.log(data,'data');
  const [proposals, setProposals] = useState(data)

    

  const deactive = `bg-transparent
  text-blue-600 font-medium text-xs leading-tight
  uppercase hover:bg-blue-700 focus:bg-blue-700
  focus:outline-none focus:ring-0 active:bg-blue-600
  transition duration-150 ease-in-out overflow-hidden
  border border-blue-600 hover:text-white focus:text-white`

  const active = `bg-blue-600
  text-white font-medium text-xs leading-tight
  uppercase hover:bg-blue-700 focus:bg-blue-700
  focus:outline-none focus:ring-0 active:bg-blue-800
  transition duration-150 ease-in-out overflow-hidden
  border border-blue-600`

  return (
    <div className="flex flex-col p-8">
      <div className="flex flex-row justify-center items-center" role="group">
        <button
          aria-current="page"
          className={`rounded-l-full px-6 py-2.5 ${active}`}
        >
          Open
        </button>
        <button
          aria-current="page"
          className={`rounded-r-full px-6 py-2.5 ${deactive}`}
        >
          Closed
        </button>
      </div>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md rounded-md">
            <table className="min-w-full">
              <thead className="border-b dark:border-gray-500">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Created By
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Expires
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((proposal, i) => {
                  const handlerPayout = async(id)=>{
                    await payoutBeneficiary(id)
                    toast.success('Beneficiary Payout Successful')
                  }
                  return(
                    (
                    <tr
                      key={i}
                      className="cursor-pointer border-b dark:border-gray-500"
                    >
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-row justify-start items-center space-x-3">
                          <Identicon
                            string={'Mark Zuck' + i}
                            size={25}
                            className="h-10 w-10 object-contain rounded-full mr-3"
                          />
                         {proposal.proposer.slice(0, 6)}...
                        </div>
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {proposal.description.slice(0, 30)}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {new Date().getTime() > Number(proposal.duration + '000')?'Expired': 'Open' }
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        <Link to={'/proposal/' +  proposal.id
                        }
                          className="border-2 rounded-full px-6 py-2.5 border-blue-600
                          text-blue-600 font-medium text-xs leading-tight
                          uppercase hover:border-blue-700 focus:border-blue-700
                          focus:outline-none focus:ring-0 active:border-blue-800
                          transition duration-150 ease-in-out mr-4"
                        >
                          View
                        </Link>
                        {new Date().getTime() > Number(proposal.duration + '000') ? (
                          proposal?.upvotes > proposal?.downvotes ? (
                            !proposal.paid ? (
                              <button
                          className="border-2 rounded-full px-6 py-2.5 border-blue-600
                          text-blue-600 font-medium text-xs leading-tight
                          uppercase hover:border-blue-700 focus:border-blue-700
                          focus:outline-none focus:ring-0 active:border-blue-800
                          transition duration-150 ease-in-out"
                          onClick={()=>handlerPayout(proposal.id)}
                        >
                          Payout
                        </button>
                            ):(
                              <button
                          className="border-2 rounded-full px-6 py-2.5 border-green-600
                          text-green-600 font-medium text-xs leading-tight
                          uppercase hover:border-green-700 focus:border-green-700
                          focus:outline-none focus:ring-0 active:border-green-800
                          transition duration-150 ease-in-out"
                        >
                          Paid
                        </button>
                            )
                          ):(
                            <button
                          className="border-2 rounded-full px-6 py-2.5 border-red-600
                          text-red-600 font-medium text-xs leading-tight
                          uppercase hover:border-red-700 focus:border-red-700
                          focus:outline-none focus:ring-0 active:border-red-800
                          transition duration-150 ease-in-out"
                        >
                         Rejected
                        </button>
                          )
                        ) : null}
                      </td>
                    </tr>
                  )
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <button
          aria-current="page"
          className="rounded-full px-6 py-2.5 bg-blue-600
            text-white font-medium text-xs leading-tight
            uppercase hover:bg-blue-700 focus:bg-blue-700
            focus:outline-none focus:ring-0 active:bg-blue-800
            transition duration-150 ease-in-out dark:text-gray-300
            dark:border dark:border-gray-500 dark:bg-transparent"
        >
          Load More
        </button>
      </div>
    </div>
  )
}

export default Proposals