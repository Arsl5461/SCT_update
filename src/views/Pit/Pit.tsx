import React, { useCallback, useMemo } from 'react';
import Page from '../../components/Page';
import PitImage from '../../assets/img/cemetry.png';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useBondStats from '../../hooks/useBondStats';
import useTombFinance from '../../hooks/useTombFinance';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import { useTransactionAdder } from '../../state/transactions/hooks';
import ExchangeStat from './components/ExchangeStat';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import { getDisplayBalance } from '../../utils/formatBalance';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../tomb-finance/constants';
import { Typography } from '@material-ui/core';
import Waves from "../../assets/img/sky.352b80b2.svg"
import Nav from "../../components/Nav/Nav"
import Stats from "../../views/Home/Stats"
import Crypto11 from "../../assets/img/crypto_tomb_cash.f2b44ef4.png"
import Fantom from "../../assets/img/fantom.7660b7c5.svg"


// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: var(--black);
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='%231D1E1F' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E");
// }

// * {
//     background: transparent;
//     border-radius: 0 !important;
//     box-shadow: none !important;
// }
// `;

const BackgroundImage = createGlobalStyle`
body {
  background: url(${Waves}) no-repeat top, url(${PitImage}) no-repeat bottom;

  background-size: cover !important;
}
`;

const Pit: React.FC = () => {
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const tombFinance = useTombFinance();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashPrice = useCashPriceInLastTWAP();
  const bondsPurchasable = useBondsPurchasable();

  const bondBalance = useTokenBalance(tombFinance?.TBOND);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await tombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} PBOND with ${amount} SCT`,
      });
    },
    [tombFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await tombFinance.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} PBOND` });
    },
    [tombFinance, addTransaction],
  );
  const ipBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const ipBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 0.101, [bondStat]);

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        <Stats/>
        {!!account ? (
          <>
        
          <div className='cemetry_title'>
               <div className="heading wheat mar-right pit-center ">PIT</div>
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
              <div className="rounded"><img src={Crypto11} width="50" height="50"/></div>
              <div className="rounded"><img src={Fantom} width="50" height="50"/></div>
              </div>
          
          <div className='cemetry_heading'>Purchase TBOND</div>
          <div className="deposit">TBOND to TBOND</div>
          <div className="deposit">7,665,2 TBOND available for purchase</div>
          <StyledCardWrapper className='btn'>
                <ExchangeCard
                  action="Purchase"
                  fromToken={tombFinance.TOMB}
                  fromTokenName="SCT"
                  toToken={tombFinance.TBOND}
                  toTokenName="PBOND"
                  priceDesc={
                    !ipBondPurchasable
                      ? ''
                      : getDisplayBalance(bondsPurchasable, 18, 4) + ' PBOND available for purchase'
                  }
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || ipBondRedeemable}
                />
              </StyledCardWrapper>
              </div>
              <div className="cemetry_cards-1">
              <div className="cemetry_images">
              <div className="rounded"><img src={Crypto11} width="50" height="50"/></div>
              <div className="rounded"><img src={Fantom} width="50" height="50"/></div>
              </div>
          <div className='cemetry_heading'>Redeem TOMB</div>
          <div className="deposit">TBOND to TBOND</div>
          <div className="deposit card11">0.0000 TBOND Available in wallet</div>
          <div className="deposit card11 hidden">0.0000 TBOND Available in wallet</div>
          <div className="deposit card11 hidden">0.0000 TBOND Available in wallet</div>

          
          <StyledCardWrapper>
                <ExchangeCard
                  action="Redeem"
                  fromToken={tombFinance.TBOND}
                  fromTokenName="PBOND"
                  toToken={tombFinance.TOMB}
                  toTokenName="SCT"
                  priceDesc={`${getDisplayBalance(bondBalance)} PBOND Available in wallet`}
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || bondBalance.eq(0) || !ipBondRedeemable}
                  disabledDescription={!ipBondRedeemable ? `Enabled when SCT > ${BOND_REDEEM_PRICE}AVAX` : null}
                  
                />
              </StyledCardWrapper>
              </div>
              </div>
        
          
      
             {/* <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
        <strong style={{color:"wheat"}}>Masonry</strong>
         <div className='bio wheat font12'>Earn TSHARE by staking LP</div>
      </Typography>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} subtitle="Earn premiums upon redemption" />
            </Route> */}
            {/* <StyledBond>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Purchase"
                  fromToken={tombFinance.TOMB}
                  fromTokenName="SCT"
                  toToken={tombFinance.TBOND}
                  toTokenName="PBOND"
                  priceDesc={
                    !ipBondPurchasable
                      ? 'SCT is over peg'
                      : getDisplayBalance(bondsPurchasable, 18, 4) + ' PBOND available for purchase'
                  }
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || ipBondRedeemable}
                />
              </StyledCardWrapper>
              <StyledStatsWrapper>
                <ExchangeStat
                  tokenName="SCT"
                  description="Last-Hour TWAP Price"
                  price={getDisplayBalance(cashPrice, 18, 4)}
                />
                <Spacer size="md" />
                <ExchangeStat
                  tokenName="PBOND"
                  description="Current Price: (SCT)^2"
                  price={Number(bondStat?.tokenInFtm).toFixed(2) || '-'}
                />
              </StyledStatsWrapper>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Redeem"
                  fromToken={tombFinance.TBOND}
                  fromTokenName="PBOND"
                  toToken={tombFinance.TOMB}
                  toTokenName="SCT"
                  priceDesc={`${getDisplayBalance(bondBalance)} PBOND Available in wallet`}
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || bondBalance.eq(0) || !ipBondRedeemable}
                  disabledDescription={!ipBondRedeemable ? `Enabled when SCT > ${BOND_REDEEM_PRICE}AVAX` : null}
                />
              </StyledCardWrapper>
            </StyledBond> */}
        </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  background: transparent;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  background: transparent;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  background: transparent;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Pit;
