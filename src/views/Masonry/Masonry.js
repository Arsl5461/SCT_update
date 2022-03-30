import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import { makeStyles } from '@material-ui/core/styles';
import useRebateTreasury from "../../hooks/useRebateTreasury"
import Crypto11 from "../../assets/img/crypto_tomb_cash.f2b44ef4.png"
import Fantom from "../../assets/img/fantom.7660b7c5.svg"

import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

import useRedeemOnMasonry from '../../hooks/useRedeemOnMasonry';
import useStakedBalanceOnMasonry from '../../hooks/useStakedBalanceOnMasonry';
import { getDisplayBalance } from '../../utils/formatBalance';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useFetchMasonryAPR from '../../hooks/useFetchMasonryAPR';

import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnMasonry from '../../hooks/useTotalStakedOnMasonry';
import useClaimRewardCheck from '../../hooks/masonry/useClaimRewardCheck';
import useWithdrawCheck from '../../hooks/masonry/useWithdrawCheck';
import ProgressCountdown from './components/ProgressCountdown';
import MasonryImage from '../../assets/img/background.png';
import { createGlobalStyle } from 'styled-components';
import Nav from "../../components/Nav/Nav"
import Stats from "../../views/Home/Stats"
import Waves from "../../assets/img/sky.352b80b2.svg"
// import { createGlobalStyle } from 'styled-components';
import Cemetryy from "../../assets/img/cemetry.png"



const BackgroundImage = createGlobalStyle`
body {
  background: url(${Waves}) no-repeat top, url(${Cemetryy}) no-repeat bottom;

  background-size: cover !important;
}
`;
  


// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: var(--black);
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='%231D1E1F' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E");
// }

// * {
//     border-radius: 0 !important;
//     box-shadow: none !important;
// }
// `;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Masonry = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const { onRedeem } = useRedeemOnMasonry();
  const stakedBalance = useStakedBalanceOnMasonry();
  const currentEpoch = useCurrentEpoch();
  const cashStat = useCashPriceInEstimatedTWAP();
  const totalStaked = useTotalStakedOnMasonry();
  const masonryAPR = useFetchMasonryAPR();
  const canClaimReward = useClaimRewardCheck();
  const canWithdraw = useWithdrawCheck();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const { to } = useTreasuryAllocationTimes();
  const rebateStats = useRebateTreasury()

  return (
    <Page>
      <BackgroundImage />
      <Stats/>
  {!!account ? (
    <>
      <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
        <strong style={{color:"wheat"}}>Masonry</strong>
         <div className='bio wheat font12'>Earn TSHARE by staking LP</div>
      </Typography>
      <Box mt={5}>
        <Grid container justify="center" spacing={3}>
      <div className='mid-center'>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
              <div className='cemetry-small-3' >
                <Typography style={{ textAlign: 'center' }}>Next Epoch</Typography>
                <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
              </div>
            
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
          
              <div className='cemetry-small-3'>
                <Typography>Current Epoch</Typography>
                {/* <Typography>{Number(currentEpoch)}</Typography> */}
                <Typography>{Number(0)}</Typography>
              </div>
         
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            
              <div  className='cemetry-small-3'>
                <Typography>
                  SCT Price<small> (TWAP)</small>
                </Typography>
                <Typography>{rebateStats.tombPrice.toFixed(4)} AVAX</Typography>
              </div>
            
          </Grid>
          <Grid item xs={12} md={2} lg={2} >
           
              <div className='cemetry-small-3'>
                <Typography>APR</Typography>
                <Typography>{masonryAPR.toFixed(2)}%</Typography>
              </div>
           
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
          
              <div className='cemetry-small-3'>
                <Typography>PSHARES Staked</Typography>
                <Typography>{getDisplayBalance(totalStaked)}</Typography>
              </div>
           
          </Grid>
          </div>
        </Grid>

        {/* <Grid container justify="center">
          <Box mt={3} style={{ width: '525px' }}>
            <Alert variant="filled" severity="info" style={{ backgroundColor:"#06296e", marginBottom:'20px'}}>
              Staked PSHARES can only be withdrawn after 6 epochs (36 hours) since deposit. Reward SCTS can only be claimed after 3 epochs (18 hours) since deposit.
              Any time tokens are harvested, deposited, or withdrawn, the lockup timer gets reset.
            </Alert>
          </Box>
        </Grid> */}

        <Box mt={4}>
          <StyledBoardroom>
            <StyledCardsWrapper>
              <StyledCardWrapper>
                <Harvest />
              </StyledCardWrapper>
              <Spacer />
              <StyledCardWrapper>
                <Stake />
              </StyledCardWrapper>
            </StyledCardsWrapper>
          </StyledBoardroom>
        </Box>
      </Box>

      <Box mt={5}>
        <Grid container justify="center" spacing={3} mt={10}>
          <Button 
          className="btn btn-disabled"
            disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
            // disabled = { true }
            onClick={onRedeem}
            color="primary"
            variant="contained"
          >
            Claim and Withdraw
          </Button>
        </Grid>
      </Box>
    </>
  ) : (
    <UnlockWallet />
  )}
</Page>
);
};

const StyledBoardroom = styled.div`
align-items: center;
display: flex;
flex-direction: column;
@media (max-width: 768px) {
width: 100%;
}
`;

const StyledCardsWrapper = styled.div`
display: flex;
width: 600px;
@media (max-width: 768px) {
width: 100%;
flex-flow: column nowrap;
align-items: center;
}
`;

const StyledCardWrapper = styled.div`
display: flex;
flex: 1;
flex-direction: column;
@media (max-width: 768px) {
width: 80%;
}
`;


//   return (
   
//     <>
//       <BackgroundImage />
//       <Nav/>
//       <Stats/>
//       <div className='cemetry_title'>
//      <div className="heading wheat">Masonry</div>
// <div className='bio wheat'>Earn TSHARE by staking LP</div>
// </div>
// <div className="cemetry-small">

//     <div className="cemetry-small-3">
//         <div className="heading-cemetry">Next Epoch</div>
//         <div className="value">02:26:34</div>
//         </div>
//         <div className="cemetry-small-3">
//         <div className="heading-cemetry">APR</div>
//         <div className="value">2,529.80%</div>
//         </div>
//         <div className="cemetry-small-3">
//         <div className="heading-cemetry">Current Epoch</div>
//         <div className="value">1,128</div>
//         </div>
//         <div className="cemetry-small-3">
//         <div className="heading-cemetry">TWAP</div>
//         <div className="value">0.9813</div>
//         </div>
//         <div className="cemetry-small-3">
//         <div className="heading-cemetry">TSHARE Stocked</div>
//         <div className="value">37,268.1616</div>
//         </div>
   

// </div>
// <div className="masonry_cards">
//     <div className="cemetry_cards-1">
//         <div className="cemetry_images">
//     <div class="rounded"><img src={Crypto11} width="50" height="50"/></div>
//     {/* <div class="rounded"><img src={Fantom} width="50" height="50"/></div> */}
//     </div>

// <div className='cemetry_heading'>TOMB-EARNED</div>
// <div className="deposit">0</div>
// <div className="deposit">USD:$0.00</div>
// <button className='btn btn-disabled'>Claim</button>
//     </div>
//     <div className="cemetry_cards-1">
//         <div className="cemetry_images">
//     <div class="rounded"><img src={Crypto11} width="50" height="50"/></div>
   
//     </div>

// <div className='cemetry_heading'>TSHARE-STOCKED</div>
// <div className="deposit">0</div>
// <div className="deposit">USD=$0.00</div>
// <button className='btn'>Approve TSHARE</button>
//     </div>
//     </div>
//     <button className='btn margin'>Claim And Withdraw</button>

//       </>
//   )
// }
  
export default Masonry;
