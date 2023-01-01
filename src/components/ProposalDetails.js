import { useEffect, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FaGlobeAfrica } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts'
import { getProposal, voteOnProposal } from '../Blockchain.services'
import { daysRemaining, useGlobalState } from '../store'

const data = [
  {
    name: 'Voters',
    Acceptees: 4000,
    Rejectees: 2400,
  },
]

const ProposalDetails = () => {
  const {id} = useParams()
const [proposal,setProposal] = useState(null)
const [data,setData] = useState([])
const [isStakeholder] = useGlobalState('isStakeholder')

const retireveProposal = async () => {
  await getProposal(id).then(res=>{
    setProposal(res)
    setData([{
      name: 'Voters',
      Acceptees: res?.upvotes,
      Rejectees: res?.downvotes,
    }])
  })
}
const vote = async (vote) => {
  await voteOnProposal(id,vote)
  retireveProposal()
}
useEffect(()=>{
retireveProposal()
},[])
const notEnded = new Date().getTime() < proposal?.duration + '000'
  return (
    <div className="p-8">
      <h2 className="font-semibold text-3xl mb-5">
        {proposal?.title}
      </h2>
      {proposal?.upvotes} <br />
      {proposal?.downvotes}
      <p>This proposal currently have {proposal?.upvotes + proposal?.downvotes} votes and will expire in <span className="font-bold">
      {daysRemaining(proposal?.duration)} days
      </span></p>
      <hr className="my-6 border-gray-300" />
      <p>
        {proposal?.description}
      </p>
      <div className="flex flex-row justify-start items-center w-full mt-4 overflow-auto">
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Acceptees" fill="#2563eb" />
          <Bar dataKey="Rejectees" fill="#dc2626" />
        </BarChart>
      </div>
      {
        isStakeholder ? (
         notEnded ? (
          <div
        className="flex flex-row justify-start items-center mt-4"
        role="group"
      >
        <button
          type="button"
          className="inline-block px-6 py-2.5
          bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase rounded-l-full shadow-md
          hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
          focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition
          duration-150 ease-in-out dark:text-gray-300
          dark:border dark:border-gray-500 dark:bg-transparent"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={()=>vote(true)}
        >
          Accept
        </button>
        <button
          type="button"
          className="inline-block px-6 py-2.5
          bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase rounded-r-full shadow-md
          hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
          focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition
          duration-150 ease-in-out
          dark:border dark:border-gray-500 dark:bg-transparent"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={()=>vote(false)}
        >
          Reject
        </button>

        <a className="ml-6" href="#">
          <AiFillGithub size={25} className="cursor-pointer" color="#122643" />
        </a>

        <a className="ml-6" href="#">
          <FaGlobeAfrica size={25} className="cursor-pointer" color="#122643" />
        </a>
      </div>
         ) : <p> Proposal Expired</p>
        ):null
      }
    </div>
  )
}

export default ProposalDetails