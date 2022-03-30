import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import useRebateTreasury from "../../hooks/useRebateTreasury"
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import useModal from '../../hooks/useModal';
import useTokenBalance from '../../hooks/useTokenBalance';
import DepositModal from './components/DepositModal';
import useTombFinance from '../../hooks/useTombFinance';
import TokenSymbol from '../../components/TokenSymbol';
import Web3 from "web3"
import ProgressCountdown from './components/ProgressCountdown';
import Crypto11 from "../../assets/img/crypto_tomb_cash.f2b44ef4.png"
import Fantom from "../../assets/img/fantom.7660b7c5.svg"
const web3 = new Web3()
const BN = n => new web3.utils.BN(n)

const CemeteryCard = ({ bank }) => {
  const tombFinance = useTombFinance();

  const rebateStats = useRebateTreasury()

  const [approveStatus, approve] = useApprove(tombFinance.externalTokens[bank.depositTokenName], "0x946f320fDf826812618Eb10478343B0F7D97CaAb");

  const tokenBalance = useTokenBalance(tombFinance.externalTokens[bank.depositTokenName]);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={async (value) => {
        console.log("running my on confirm")
        console.log("doing the bond")
        console.log(BN(Math.floor(value * 10000)).mul(BN(10).pow(BN(14))).toString())
        if (!window.ethereum) return
        const account = (await window.ethereum.request({ method: "eth_accounts" }))[0]
        if (!account) return
        console.log("bond_debug: ",tombFinance.externalTokens[bank.depositTokenName].address, BN(Math.floor(value * 10000)).mul(BN(10).pow(BN(14))))
         window.ethereum.request({
           method: "eth_sendTransaction",
           params: [{
              from: account,
              to: rebateStats.RebateTreasury._address,
              data: rebateStats.RebateTreasury.methods.bond(tombFinance.externalTokens[bank.depositTokenName].address, BN(Math.floor(value * 10000)).mul(BN(10).pow(BN(14)))).encodeABI()
          }]
        })
        
      }}
      tokenName={bank.depositTokenName}
      token={rebateStats.assets.find( token => token.token === tombFinance.externalTokens[bank.depositTokenName].address)}
    />,
  );

  return (
    <Grid item xs={12} md={4} lg={4}>
       <div className="cemetry_cards-1" >
        <CardContent style={{ marginTop:'0px'}}>
          <ProgressCountdown base={moment().toDate()} unix_deadline={bank.poolStartUnixtimestamp} description="Rebates starts in" />
          <Box style={{ position: 'relative' }}>
            <Box
              style={{
                position: 'absolute',
                right: '0px',
                top: '-5px',
                height: '48px',
                width: '48px',
                borderRadius: '40px',
                backgroundColor: 'transparent',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* <TokenSymbol size={40} symbol={bank.depositTokenName} /> */}
            </Box>
            <div className="cemetry_images icon-mar4">
<div className="rounded icons-harvest icon-mar3"><img src={Crypto11} width="50" height="50"/></div>
<div className="rounded icons-harvest"><img src={Fantom} width="50" height="50"/></div> 
</div>
            <Typography variant="h5" component="h2" className='wheat2 center'>
              {bank.depositTokenName}
            </Typography>
            <Typography color="textSecondary" className="center">
              {/* {bank.name} */}
              Bond <strong style={{color : "#ff4c39"}}>{bank.depositTokenName.toUpperCase()}</strong> <div>Earn<strong style={{color : "#ff4c39"}}> SCT</strong></div> 
            </Typography>

            {/* <Typography color="textSecondary">
              Multiplier: {bank.multiplier}
            </Typography> */}
          </Box>
        </CardContent>
        <CardActions style={{ margin:'0px 10px 10px 10px', paddingTop:'0px', justifyContent: 'flex-end' }}>
          {approveStatus !== ApprovalState.APPROVED ? (
              <Button
              disabled={approveStatus !== ApprovalState.NOT_APPROVED}
              variant="contained"
              color="primary"
              onClick={approve}
              className="btn"
              >
              Approve {bank.depositTokenName}
              </Button>
          ) : (
            <Button color="primary" size="small" variant="contained" onClick={onPresentDeposit}>
              Bond
            </Button>
          )}

        </CardActions>
      </div>
     </Grid>
  );
};

export default CemeteryCard;
