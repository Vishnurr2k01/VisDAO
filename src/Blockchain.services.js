import Web3 from "web3";
import { setGlobalState, getGlobalState, useGlobalState } from "./store";
import abi from './abis/DominionDAO.json'

const { ethereum } = window
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)
const toWei = (num)=> window.web3.utils.toWei(num.toString(),'ether')
const fromWei = (num)=> window.web3.utils.fromWei(num)

const connectWallet = async () => {

    try {
        if (!ethereum) return alert("Install metamask")
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setGlobalState('connectedAccount', accounts[0].toLowerCase())

    } catch (error) {
        console.log(Json.stringify(error), 'error')
    }
}

const isWalletConnected = async () => {
    try {
        if (!ethereum) return alert("Install metamask")
        const accounts = await ethereum.request({ method: 'eth_accounts' })

        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload()
        })
        window.ethereum.on('accountsChanged', async () => {
            setGlobalState('connectedAccount', accounts[0].toLowerCase())
            await isWalletConnected()
            await getInfo()
        })

        if (accounts.length) {
            setGlobalState('connectedAccount', accounts[0].toLowerCase())
        } else {
            alert('Please connect your wallet')
            console.log("account not found")
        }


    } catch (error) {
        console.log(Json.stringify(error), 'error')
    }
}

const getEthereumContract = async () => {
    const connectedAccount = getGlobalState('connectedAccount')

    if(connectedAccount){
        const web3 = window.web3
        const networkId = await web3.eth.net.getId()
        const networkData = await abi.networks[networkId]
        if(networkData){
            const contract = new web3.eth.Contract(abi.abi,networkData.address)
            return contract
        }else
        return null
    }else{
        return getGlobalState('contract')
    }
}

const performContribute = async(amount)=>{
    try {
        const contract = await getEthereumContract()
        const account = getGlobalState('connectedAccount')
        // console.log(toWei(amount),account)
        await contract.methods.contribute().send({from:account,value : toWei(amount)})
        await getInfo()
    
    } catch (error) {
        console.log(error);
    }
}

const getInfo= async () =>{
    try {
        if(!ethereum)return alert('Install metamask')

        const contract = await getEthereumContract()
        const connectedAccount = getGlobalState('connectedAccount') 

        const isStakeholder = await contract.methods.isStakeholder().call({from:connectedAccount})

        const balance = await contract.methods.daoBalance().call()
        const mybalance = await contract.methods.getBalance().call({from:connectedAccount})

        setGlobalState('balance',fromWei(balance))
        setGlobalState('mybalance',fromWei(mybalance))
        setGlobalState('isStakeholder',isStakeholder)

    } catch (error) {
        console.log(error);
    }
}

const getProposals = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')
  
      const contract = await getEthereumContract()
      const proposals = await contract.methods.getProposals().call()
      console.log(proposals);
      setGlobalState('proposals', structuredProposals(proposals))
      console.log(structuredProposals(proposals));
      console.log(getGlobalState('proposals'));
      
    } catch (error) {
      reportError(error)
    }
  }
  
  const structuredProposals = (proposals) => {
    return proposals
      .map((proposal) => ({
        id: proposal.id,
        amount: window.web3.utils.fromWei(proposal.amount),
        title: proposal.title,
        description: proposal.description,
        paid: proposal.paid,
        passed: proposal.passed,
        proposer: proposal.proposer,
        upvotes: Number(proposal.upvotes),
        downvotes: Number(proposal.downvotes),
        beneficiary: proposal.beneficiary,
        executor: proposal.executor,
        duration: proposal.duration,
      }))
      .reverse()
  }
  
  const getProposal = async (id) => {
    try {
      const proposals = getGlobalState('proposals')
      return proposals.find((proposal) => proposal.id == id)
    } catch (error) {
      reportError(error)
    }
  }

const createProposal = async({title,description,beneficiary,amount}) =>{

    try {
        amount = window.web3.utils.toWei(amount.toString(), 'ether')
        const contract = await getEthereumContract()
        const account = getGlobalState('connectedAccount')
    
        await contract.methods
          .createProposal(title, description, beneficiary, amount)
          .send({ from: account })
    
        window.location.reload()
      } catch (error) {
        
        return error
      }
}
const voteOnProposal = async (proposalId, supported) => {
    try {
      const contract = await getEthereumContract()
      const account = getGlobalState('connectedAccount')
      await contract.methods
        .performVote(proposalId, supported)
        .send({ from: account })
  
      window.location.reload()
    } catch (error) {
      reportError(error)
    }
  }
  
  const listVoters = async (id) => {
    try {
      const contract = await getEthereumContract()
      const votes = await contract.methods.getVotesOf(id).call()
      return votes
    } catch (error) {
      reportError(error)
    }
  }
  
  const payoutBeneficiary = async (id) => {
    try {
      const contract = await getEthereumContract()
      const account = getGlobalState('connectedAccount')
      await contract.methods.payBeneficiary(id).send({ from: account })
      window.location.reload()
    } catch (error) {
      reportError(error)
    }
  }
export { connectWallet, isWalletConnected ,performContribute,getInfo,createProposal ,
     getProposal , getProposals , voteOnProposal,listVoters,payoutBeneficiary}