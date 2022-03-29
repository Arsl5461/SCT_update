import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/background1.png';
import HomeImage2 from '../../assets/img/background2.png';
import CashImage from '../../assets/img/sct_logo.png';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useFantomPrice from '../../hooks/useFantomPrice';
import { tomb as tombTesting, tShare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { tomb as tombProd, tShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';
import ProgressCountdown from './components/ProgressCountdown';
import useTotalTreasuryBalance from '../../hooks/useTotalTreasuryBalance.js';
import moment from 'moment';
import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';
import ParticleBackground from '../../ParticalBackground';
import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import Crypto1 from "../../assets/img/crypto_tomb_cash.f2b44ef4.png"
import Crypto2 from "../../assets/img/crypto_tomb_share.bf1a6c52.png"
import Meta from "../../assets/img/meta-mask.png"
import Stats from "./Stats"
import Nav from "../../components/Nav/Nav"
import {Link} from "react-router-dom"

// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: var(--black);
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='%231D1E1F' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E");
// }

// * {
//     border-radius: 0 !important;
// }
// `;

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage2}) no-repeat top, url(${HomeImage}) no-repeat top;
  
    background-size: cover !important;
  }
`;
const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats('SCT-WAVAX LP');
  const tShareFtmLpStats = useLpStats('PSHARES-WAVAX LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();
  const { price: ftmPrice, marketCap: ftmMarketCap, priceChange: ftmPriceChange } = useFantomPrice();
  const { balance: rebatesTVL } = useTotalTreasuryBalance();
  const totalTVL = TVL + rebatesTVL;

  let tomb;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    tomb = tombTesting;
    tShare = tShareTesting;
  } else {
    tomb = tombProd;
    tShare = tShareProd;
  }

  const buyTombAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tomb.address;
  const buyTShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tShare.address;

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: 'SCT-WAVAX LP' });
  const tshareLpZap = useZap({ depositTokenName: 'PSHARE-WAVAX LP' });

  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
    color: var(--accent-light);
  `;

  const [onPresentTombZap, onDissmissTombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTombZap();
      }}
      tokenName={'SCT-WAVAX LP'}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={'PSHARE-WAVAX LP'}
    />,
  );
  const MainFarmStartTimeStamp = 1648346400;
  return (
    <Page>

{/* <div className='bg1bg'> */}
{/* <Nav/> */}
<Stats/>

<div className='heading_title'>

<div className='title'>
  <div className="heading wheat">
Tomb Finance
  </div>
  <div className="heading2 wheat">
The algorithmic token pegged to FTM</div>
</div>
<div className='tvl_amount'>
  TVL     <CountUp style={{ fontSize: '25px' }} className="number" end={totalTVL} separator="," prefix="$" />
</div>
{/* </div> */}
</div>

{/* <div className='bg2bg'> */}
<div className='cards'>
{/* Card1 */}
<div className='card1'>
  <div className='cards_heading'>
    <img src={Crypto1}></img>
    <p className="title_card">$TOMB</p>
   
    <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('SCT');
                }}
                color="secondary"
                variant="outlined"
                style={{borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
    
  </div>
    <h1 className='white center font12'>Current Price</h1>
    <p className='purple center font12'>FTM <span className='white font font12'>{tombPriceInFTM ? tombPriceInFTM : '-.----'}</span></p>
    <p className='purple center font12'>USD <span className='white font12'>{tombPriceInDollars ? tombPriceInDollars : '-.--'}</span></p>
    <p className='purple center font12'>Market Gap:</p>
    <h1 className='white center font12'>${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)}</h1>
    <p className='purple center font12'>Circulating Supply:</p>
    <h1 className='white center font12'>{tombCirculatingSupply}</h1>
    <p className='purple center font12'>Total Supply:</p>
    <h1 className='white center font12' >${tombTotalSupply}</h1>
<button className='buy_tomb center btn font12'><a className='tomb' href="https://spookyswap.finance/swap?outputCurrency=0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37">Buy Tomb</a></button>
  </div>
  
  {/* Card2 */}
  <div className='card1'>
  <div className='cards_heading'>
    <img src={Crypto1}></img>
    <h3 className="title_card">$TSHARE</h3>
   
    <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('PSHARES');
                }}
                color="secondary"
                variant="outlined"
                style={{borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
    
  </div>
    <h1 className='white center font12'>Current Price</h1>
    <p className='purple center font12'>FTM <span className='white font font12'>{tSharePriceInFTM ? tSharePriceInFTM : '-.----'}</span></p>
    <p className='purple center font12'>USD <span className='white font12'>{tSharePriceInDollars ? tSharePriceInDollars : '-.--'}</span></p>
    <p className='purple center font12'>Market Gap:</p>
    <h1 className='white center font12'>{(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)}</h1>
    <p className='purple center font12'>Circulating Supply:</p>
    <h1 className='white center font12'>{tBondCirculatingSupply}</h1>
    <p className='purple center font12'>Total Supply:</p>
    <h1 className='white center font12'>${tShareTotalSupply}</h1>
<button className='buy_tomb center btn font12'><a className='tomb' href="https://spookyswap.finance/swap?outputCurrency=0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37">Buy TSHARE</a></button>
  </div>
  
  {/* Card 3 */}
  <div className='card1'>
  <div className='cards_heading'>
    <img src={Crypto1}></img>
    <h3 className="title_card">$TBOND</h3>
  
    <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('PBOND');
                }}
                color="secondary"
                variant="outlined"
                style={{ borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
    
  </div>
    <h1 className='white center font12'>Current Price</h1>
    <p className='purple center font12'>FTM <span className='white font font12'>{tBondPriceInFTM ? tBondPriceInFTM : '-.----'}</span></p>
    <p className='purple center font12'>USD <span className='white font12'>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span></p>
    <p className='purple center font12'>Market Gap:</p>
    <h1 className='white center font12'>${(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)}</h1>
    <p className='purple center font12'>Circulating Supply:</p>
    <h1 className='white center font12'>{tBondCirculatingSupply}</h1>
    <p className='purple center font12'>Total Supply:</p>
    <h1 className='white center font12'>{tBondTotalSupply}</h1>
<button className='buy_tomb center btn font12'><Link className='tomb' to="/pit">Buy TBOND</Link></button>
  </div>
  
</div>

{/* </div> */}

      {/* <ParticleBackground/> */}
      

      {/* <Image color="none" style={{ width: '100%', height: '100%', paddingTop: '0px' }} src={HomeImage2} /> */}

      <BackgroundImage />

      

      <Grid container spacing={3}>

        {/* TOMB */}
        {/* <Grid item xs={12} sm={3}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>SCT</h2>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('SCT');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2} style={{ backgroundColor: "transparent !important" }}>
                <CardIcon style={{ backgroundColor: "transparent !important" }}>
                  <TokenSymbol symbol="TOMB" style={{ backgroundColor: "transparent !important" }} />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tombPriceInFTM ? tombPriceInFTM : '-.----'} AVAX</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tombCirculatingSupply} <br />
                Total Supply: {tombTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid> */}

        {/* TSHARE */}
        {/* <Grid item xs={12} sm={3}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>PSHARES</h2>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('PSHARES');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TSHARE" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tSharePriceInFTM ? tSharePriceInFTM : '-.----'} AVAX</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tShareCirculatingSupply} <br />
                Total Supply: {tShareTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid> */}

        {/* TBOND */}
        {/* <Grid item xs={12} sm={3}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>PBOND</h2>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('PBOND');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TBOND" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tBondPriceInFTM ? tBondPriceInFTM : '-.----'} AVAX</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tBondCirculatingSupply} <br />
                Total Supply: {tBondTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center">
              <h2>SCT-WAVAX Joe LP</h2>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('SCT-WAVAX LP');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TOMB-AVAX-LP" />
                </CardIcon>
              </Box>
              
              <Box mt={2}>
                <Button color="primary" disabled={false} onClick={onPresentTombZap} variant="contained">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} SCT /{' '}
                  {tombLPStats?.ftmAmount ? tombLPStats?.ftmAmount : '-.--'} AVAX
                </span>
              </Box>
              <Box>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'} <br />
                Total supply: {tombLPStats?.totalSupply ? tombLPStats.totalSupply : '-.--'}
              </span> 
             </CardContent>
          </Card>
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center">
              <h2>PSHARES-WAVAX Joe LP</h2>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('PSHARES-WAVAX LP');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TSHARE-AVAX-LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" onClick={onPresentTshareZap} variant="contained">
                  Zap In
                </Button>
            </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} PSHARE /{' '}
                  {tshareLPStats?.ftmAmount ? tshareLPStats?.ftmAmount : '-.--'} AVAX
                </span>
              </Box>
              <Box>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
              {/* <span style={{ fontSize: '12px' }}>
                Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {tshareLPStats?.totalSupply ? tshareLPStats.totalSupply : '-.--'}
              </span>  
             </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Page>
  );
};

export default Home;
