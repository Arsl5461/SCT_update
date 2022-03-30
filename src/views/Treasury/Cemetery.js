import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CountUp from 'react-countup';
import Bank from '../Bank';
import { makeStyles } from '@material-ui/core/styles';
import useTotalTreasuryBalance from '../../hooks/useTotalTreasuryBalance.js'
import BackImage from '../../assets/img/background.png';
import { Box, Card, CardContent, Typography, Grid, Container } from '@material-ui/core';

import { Alert } from '@material-ui/lab';
import Waves from "../../assets/img/sky.352b80b2.svg"
import Stats from "../../views/Home/Stats"



import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from './CemeteryCard';
import { createGlobalStyle } from 'styled-components';
import Cemetryy from "../../assets/img/cemetry.png"
import useBanks from '../../hooks/useBanks';

const assetList = [
  // {
  //   depositTokenName: '2SHARES',
  // },
  // {
  //   depositTokenName: '2SHARES-WAVAX LP',
  // },
  {
    depositTokenName: 'SCT-WAVAX LP',
  },
  {
    depositTokenName: 'PSHARES',
  },
  {
    depositTokenName: 'PSHARES-WAVAX LP',
  },
]

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
  const activeBanks = banks.filter((bank) => !bank.finished);
  const { balance, balance_sct_wftm, balance_pshares_wftm, balance_sct, balance_pshares } = useTotalTreasuryBalance();
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          <Stats/>
          {!!account ? (
            <Container maxWidth="lg">
              <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '35px', marginBottom: '30px',textAlign:'center', }}>
                Treasury
              </Typography>

              {/* <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Genesis Pools
                  </Typography>
                  <Grid container spacing={3}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 0)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>
              </Box> */}
              
              <Box mt={2}>
                <Grid container justify="center" spacing={3}>
                  <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
                    <div className='cemetry-small-4'>
                      <CardContent align="center">
                        <Typography variant="h5">
                          Total Treasury Balance:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance} separator="," prefix="$" />
                      </CardContent>
                    </div>
                  </Grid>
                </Grid>
              </Box>

              <Box mt={2} style={{ marginTop: '100px' }}>
              <Typography color="textPrimary" align="center" variant="h4" gutterBottom style={{ marginBottom: '50px' }}>
                Protocol Owned Assets
              </Typography>
                <Grid container justify="center" spacing={3}>
                  <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
                    <div className="cemetry_cards-1">
                      <CardContent align="center">
                        <Typography variant="h5" className='wheat2'>
                          SCT-WAVAX LP:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_sct_wftm} separator="," prefix="$" className='wheat2' />
                      </CardContent>
                      <CardContent align="center">
                        <Typography variant="h5" className='wheat2'>
                          PSHARES-WAVAX LP:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_pshares_wftm} separator="," prefix="$" className='wheat2' />
                      </CardContent>
                      <CardContent align="center" className='wheat2'>
                        <Typography variant="h5">
                          USDT:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_pshares_wftm} separator="," prefix="$" className='wheat2' />
                      </CardContent>
                      {/* <CardContent align="center">
                        <Typography variant="h5">
                          2SHARES-WAVAX LP:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_2shares_wftm} separator="," prefix="$" />
                      </CardContent> */}
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
                    <div style={{ height: "auto" }} className='cemetry_cards-1'>
                      <CardContent align="center" className='wheat2'>
                        <Typography variant="h5" > 
                          WAVAX:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_sct} separator="," prefix="$" />
                      </CardContent>
                      <CardContent align="center" className='wheat2'>
                        <Typography variant="h5">
                          USDC:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={0} separator="," prefix="$" />
                      </CardContent>
                      <CardContent align="center" className='wheat2'>
                        <Typography variant="h5">
                          PSHARES:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_pshares} separator="," prefix="$" />
                      </CardContent>
                      {/* <CardContent align="center">
                        <Typography variant="h5">
                          2SHARES:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_2shares} separator="," prefix="$" />
                      </CardContent> */}
                    </div>
                  </Grid>
                </Grid>
              </Box>

              {/* <Grid container justify="center" spacing={3}>
                {assetList.map((asset) => 
                <Card>
                  <CemeteryCard bank={asset} />
                </Card>
                )}
              </Grid> */}




              

            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Cemetery;
