import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import Identicon from 'react-identicons'
import { Link, useParams } from 'react-router-dom'
import { listVoters } from '../Blockchain.services'
// import { truncate } from '../store'

const Voters = () => {
  const {id} = useParams()
  const [voters,setVoters] = useState([])
  const [data,setData] = useState([])
  const timeago = (timestamp)=> moment(Number(timestamp + '000')).fromNow()

  useEffect(async()=>{
    await listVoters(id).then((res)=>{
      setVoters(res)
      setData(res)
    })
  ,[id]})

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
          Acceptees
        </button>
        <button
          aria-current="page"
          className={`rounded-r-full px-6 py-2.5 ${deactive}`}
        >
          Rejectees
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
                    Voter
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Voted
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Vote
                  </th>
                </tr>
              </thead>
              <tbody>
               {voters?.map((voter,i)=>{
                return(
                 <Voter key={i} vote={voter} />
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
            font-medium text-xs leading-tight
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
const Voter = ({vote}) => (
  <tr
  key={i}
  className="cursor-pointer border-b dark:border-gray-500 transition duration-300 ease-in-out"
>
  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
    <div className="flex flex-row justify-start items-center space-x-3">
      <Identicon
        string={'Mark Zuck' + i}
        size={25}
        className="h-10 w-10 object-contain rounded-full mr-3"
      />
      {/* <span>{truncate('0x66aEEbA2C8255967300bdba5ed1FCB4F907C8fcd', 4, 4, 11)}</span> */}
    </div>
  </td>
  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
    2 days ago
  </td>
  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
    <button 
      className="border-2 rounded-full px-6 py-2.5 border-blue-600
      text-blue-600 font-medium text-xs leading-tight
      uppercase hover:border-blue-700 focus:border-blue-700
      focus:outline-none focus:ring-0 active:border-blue-800
      transition duration-150 ease-in-out"
    >
      Accepted
    </button>
  </td>
</tr>
)
export default Voters