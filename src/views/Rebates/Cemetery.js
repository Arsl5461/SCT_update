import React, { useMemo, useState, useEffect } from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';
import { makeStyles } from '@material-ui/core/styles';
import Web3 from "web3"
import DAOImage from '../../assets/img/background.png';
import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';

import Crypto11 from "../../assets/img/crypto_tomb_cash.f2b44ef4.png"
import Fantom from "../../assets/img/fantom.7660b7c5.svg"
import MAI from "../../assets/img/MAI.0290c194.svg"
import Waves from "../../assets/img/sky.352b80b2.svg"

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from './CemeteryCard';
import { createGlobalStyle } from 'styled-components';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';

import useBanks from '../../hooks/useBanks';
import useRebateTreasury from "../../hooks/useRebateTreasury"
import Nav from "../../components/Nav/Nav"
import Stats from "../../views/Home/Stats"
// import Waves from "../../assets/img/sky.352b80b2.svg"
// import { createGlobalStyle } from 'styled-components';
import Cemetryy from "../../assets/img/cemetry.png"


const web3 = new Web3()
const BN = n => new web3.utils.BN(n)

const BackgroundImage = createGlobalStyle`
body {
  background: url(${Waves}) no-repeat top, url(${Cemetryy}) no-repeat bottom;

  background-size: cover !important;
}
`;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Cemetery = () => {
  const classes = useStyles();
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const cashStat = useCashPriceInEstimatedTWAP();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const activeBanks = banks.filter((bank) => !bank.finished);

  console.log(cashStat)

  const rebateStats = useRebateTreasury()
  console.log(rebateStats)
  const [claimablesct, setClaimablesct] = useState(0);
  const [ vested, setVested ] = useState(0)

  useEffect(() => {
    updateVesting()
    const interval = setInterval(updateVesting, 5000) 
    return () => clearInterval(interval)
  }, [])

  async function updateVesting() {
    if (!window.ethereum) return
    const address = (await window.ethereum.request({ method: "eth_accounts" }))[0]
    if (!address) return

    const claimable = await rebateStats.RebateTreasury.methods.claimableSct(address).call()
    const vesting = await rebateStats.RebateTreasury.methods.vesting(address).call()
    setClaimablesct(+web3.utils.fromWei(claimable))
    setVested(+web3.utils.fromWei(BN(vesting.amount).sub(BN(vesting.claimed))))
}

  async function claimTomb() {
    console.log("claiming the tomb")
    if (!window.ethereum) return
    const address = (await window.ethereum.request({ method: "eth_accounts" }))[0]
    if (!address) return
    window.ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        from: address,
        to: rebateStats.RebateTreasury._address,
        data: rebateStats.RebateTreasury.methods.claimRewards().encodeABI()
      }]
    })
  }

  return (
<>

{/* <div className='cemetry_title'>
     <div className="heading wheat">PIT</div>
<div className='bio wheat'>Buy and Redeem Bonds to Earn Premuims</div>
</div>
<div className="cemetry-small">

    <div className="cemetry-small-4">
        <div className="heading-cemetry">Last Epach TWAP Price</div>
        <div className="value">TOMB=0.9874FTM</div>
        </div>
        <div className="cemetry-small-4">
        <div className="heading-cemetry">Current Price</div>
        <div className="value">TBOND = 0.98FTM</div>
        </div>
        </div>
        <div className="cemetry_cards">
    <div className="cemetry_cards-1">
        <div className="cemetry_images">
    <div class="rounded"><img src={Crypto11} width="50" height="50"/></div>
    <div class="rounded"><img src={Fantom} width="50" height="50"/></div>
    </div>

<div className='cemetry_heading'>Purchase TBOND</div>
<div className="deposit">TBOND to TBOND</div>
<div className="deposit">7,665,2 TBOND available for purchase</div>
<button className='btn'>Approve TOMB</button>
    </div>
    <div className="cemetry_cards-1">
    <div className="cemetry_images">
    <div class="rounded"><img src={Crypto11} width="50" height="50"/></div>
    <div class="rounded"><img src={Fantom} width="50" height="50"/></div>
    </div>
<div className='cemetry_heading'>Redeem TOMB</div>
<div className="deposit">TBOND to TBOND</div>
<div className="deposit">0.0000 TBOND Available in wallet</div>
<button className='btn btn-disabled'>Enable when TOMB {'>'} 1.01FTM</button>
    </div>
    </div> */}


<Switch>
  <Page>
    <Route exact path={path}>
      <BackgroundImage />
<Stats/>
      {!!account ? (
        <>
          {/* <Typography color="textPrimary" align="center" variant="h3" gutterBottom style={{ marginBottom: '40px' }}>
          <strong style={{color:"#ff4c39"}}>DAO</strong>
          </Typography>
          <Box mt={2}>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12} md={3} lg={3} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography variant="h5">
                      SCT Price <small>(TWAP)</small>
                    </Typography>
                    <Typography variant="h6">{rebateStats.tombPrice.toFixed(3)} AVAX</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3} lg={3} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography variant="h5">
                      Bond Premium
                    </Typography>
                    <Typography variant="h6">{rebateStats.bondPremium.toFixed(3)}%</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box> */}
          <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
              <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '35px', marginBottom: '30px',textAlign:'center', }}>
                Bondable Assets
              </Typography>
              <Grid container spacing={3}>
                {activeBanks
                  .filter((bank) => bank.sectionInUI === 3)
                  .map((bank) => (
                    <React.Fragment key={bank.name}>
                      <CemeteryCard bank={bank} />
                    </React.Fragment>
                  ))}
              </Grid>
          </div>
          <Box mt={2}>
            {/* <Grid container justify="center" spacing={3}> */}
              {/* <Grid item xs={12} md={3} lg={3} > */}
              <div className="cemetry_cards-1  mar-rebeates">
                  <CardContent>
                    <Typography variant="h5" className="wheat2 center">
                      SCT Vesting
                    </Typography>
                    <Typography className="wheat2 center" variant="h6">{vested.toFixed(4)} Total Vested</Typography>
                    <Typography  className="wheat2 center"variant="h6">{claimablesct.toFixed(4)} Claimable</Typography>
                    <Button color="primary" size="small" variant="contained" onClick={claimTomb} style={{ marginTop: "8px" }} className="btn icon-mar3">
                      CLAIM SCT
                    </Button>
                  </CardContent>
                </div>
              {/* </Grid> */}
            {/* </Grid> */}
          </Box>
        </>
      ) : (
        <UnlockWallet />
      )}
    </Route>
  </Page>
</Switch>
</>
  )
}
//   );
// };

export default Cemetery;
