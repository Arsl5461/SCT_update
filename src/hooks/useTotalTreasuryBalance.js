import { useEffect, useState, useMemo } from "react"
import Web3 from "web3"
import useTombStats from './useTombStats'
import usetShareStats from './usetShareStats';


import { web3ProviderFrom } from "../tomb-finance/ether-utils"
import { getBalance } from "../utils/formatBalance"
import axios from 'axios'


//https://rpcapi.fantom.network/
const web3 = new Web3("https://api.avax.network/ext/bc/C/rpc")

const ERC20ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]
const treasuryAddress = "0x946f320fDf826812618Eb10478343B0F7D97CaAb"




function useTotalTreasuryBalance() {
    const tombStats = useTombStats();
    const tShareStats = usetShareStats();

    const ThreeShares = new web3.eth.Contract(ERC20ABI, '0xaC5363fbC73E0F54d2541f517094DDd99d58c305')
    const WAVAX = new web3.eth.Contract(ERC20ABI, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7')
    const [balance, setBalance] = useState(0)
    // const [balance_2shares_wftm, setBalance_2shares_wftm] = useState(0)
    const [balance_sct_wftm, setBalance_sct_wftm] = useState(0)
    const [balance_pshares_wftm, setBalance_pshares_wftm] = useState(0)
    const [balance_sct, setBalance_sct] = useState(0)
    const [balance_pshares, setBalance_pshares] = useState(0)

    const tombPriceInDollars = useMemo(
        () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
        [tombStats],
    );
    const tSharePriceInDollars = useMemo(
        () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
        [tShareStats],
      );
    
    useEffect(() => {
        
        getBalance()
        const interval = setInterval(() => {
            getBalance()
        }, 30000)
        return () => {
            clearInterval(interval);
        }
    }, [tombPriceInDollars, tSharePriceInDollars])
    
    return { balance, balance_sct_wftm, balance_pshares_wftm, balance_sct, balance_pshares }

    async function getBalance() {

        // const { data2omb } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=2omb-fi')
        // const { data2shares } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=2share')
        // const { datasct } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=30mb-token')
        
        // const { data } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=pshares')
        // const threeSharesBalance = web3.utils.fromWei(await ThreeShares.methods.balanceOf(treasuryAddress).call())
        // const valuepshares = threeSharesBalance * data[0].current_price

        // const data2sharesAndsct = await axios('https://openapi.debank.com/v1/user/chain_balance?id=0x946f320fDf826812618Eb10478343B0F7D97CaAb&chain_id=ftm')

        // console.log(`PShares USD: $${valuepshares}`)
        // console.log(`sct: $${data2sharesAndsct.data.usd_value}`)
        // const LP_2shares_wftm = await getLPBalanceInTreasury('0x6398ACBBAB2561553a9e458Ab67dCFbD58944e52', '0xc54a1684fd1bef1f077a336e6be4bd9a3096a6ca')

        // setBalance(data2sharesAndsct.data.usd_value + valuepshares + LP_2shares_wftm + LP_sct_wftm + LP_pshares_wftm)
        // setBalance_2shares_wftm(LP_2shares_wftm)
        setBalance_sct(await getsctBalance())
        setBalance_pshares(await getpsharesBalance())

        const LP_sct_wftm = await getLPBalanceInTreasury('0x9F0e978F5671818f092FcD34890ec9Ca78354694', '0x942B549334D6Cc2faAC7Ac28e5534F5A87Cc85C1')
        const LP_pshares_wftm = await getLPBalanceInTreasury('0x77a98Fa37a2D4D118418aFe76263312a159Ef99c', '0xaC5363fbC73E0F54d2541f517094DDd99d58c305')
        setBalance_sct_wftm(LP_sct_wftm)
        setBalance_pshares_wftm(LP_pshares_wftm)

    }

    async function getsctBalance() {
        const tokensct = new web3.eth.Contract(ERC20ABI, '0x942B549334D6Cc2faAC7Ac28e5534F5A87Cc85C1')

        // const { data } = await axios(`https://fantom.api.0x.org/swap/v1/quote?buyToken=USDC&sellToken=0x942B549334D6Cc2faAC7Ac28e5534F5A87Cc85C1&sellAmount=100000000000000000`)
        const usdValue = Number(web3.utils.fromWei(await tokensct.methods.balanceOf(treasuryAddress).call())) * tombPriceInDollars

        return usdValue
    }

    async function getpsharesBalance() {
        const tokenpshares = new web3.eth.Contract(ERC20ABI, '0xaC5363fbC73E0F54d2541f517094DDd99d58c305')
        // const { data } = await axios(`https://fantom.api.0x.org/swap/v1/quote?buyToken=USDC&sellToken=0xaC5363fbC73E0F54d2541f517094DDd99d58c305&sellAmount=100000000000000000`)
        const usdValue = Number(web3.utils.fromWei(await tokenpshares.methods.balanceOf(treasuryAddress).call())) * tSharePriceInDollars

        return usdValue
    }

    // async function get2sharesBalance() {
    //     const token2shares = new web3.eth.Contract(ERC20ABI, '0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca')
    //     const { data } = await axios(`https://fantom.api.0x.org/swap/v1/quote?buyToken=USDC&sellToken=0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca&sellAmount=100000000000000000`)
    //     const usdValue = Number(web3.utils.fromWei(await token2shares.methods.balanceOf(treasuryAddress).call())) * Number(data.price)

    //     return usdValue
    // }

    async function getLPBalanceInTreasury(LPAddress, tokenAddress) {
        const token = new web3.eth.Contract(ERC20ABI, tokenAddress)
        const LPtoken = new web3.eth.Contract(ERC20ABI, LPAddress)

        const { data } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=avalanche-2')
        const avax_price = data[0].current_price

        const wftmValue = Number(web3.utils.fromWei(await WAVAX.methods.balanceOf(treasuryAddress).call()))
        // const wftmValue = Number(web3.utils.fromWei(await WAVAX.methods.balanceOf(LPAddress).call()))

        return wftmValue*avax_price*2
    }

    async function getTokenPrice(tokenAddress) {
        const { data } = await axios(`https://fantom.api.0x.org/swap/v1/quote?buyToken=USDC&sellToken=${tokenAddress}&sellAmount=100000000000000000`)
        return data.price
    }
}

export default useTotalTreasuryBalance