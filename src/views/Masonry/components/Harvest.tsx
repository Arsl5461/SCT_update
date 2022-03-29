import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';

import TokenSymbol from '../../../components/TokenSymbol';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import CardIcon from '../../../components/CardIcon';
import useClaimRewardTimerMasonry from '../../../hooks/masonry/useClaimRewardTimerMasonry';
import useClaimRewardCheck from '../../../hooks/masonry/useClaimRewardCheck';
import ProgressCountdown from './ProgressCountdown';
import useHarvestFromMasonry from '../../../hooks/useHarvestFromMasonry';
import useEarningsOnMasonry from '../../../hooks/useEarningsOnMasonry';
import useTombStats from '../../../hooks/useTombStats';
import { getDisplayBalance } from '../../../utils/formatBalance';
import Crypto11 from "../../../assets/img/crypto_tomb_cash.f2b44ef4.png";
import Fantom from "../../../assets/img/fantom.7660b7c5.svg";

const Harvest: React.FC = () => {
  const tombStats = useTombStats();
  const { onReward } = useHarvestFromMasonry();
  const earnings = useEarningsOnMasonry();
  const canClaimReward = useClaimRewardCheck();

  const tokenPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
  const { from, to } = useClaimRewardTimerMasonry();

  return (
    <Box>
      <div className="cemetry_cards-1">
        <div>
          <StyledCardContentInner>
              <div className="cemetry_images">
<div className="rounded icons-harvest"><img src={Crypto11} width="50" height="50"/></div>
<div className="rounded icons-harvest"><img src={Fantom} width="50" height="50"/></div> 
</div>
            <StyledCardHeader>
              {/* <CardIcon>
                <TokenSymbol symbol="TOMB" />
              </CardIcon> */}
              {/* <Value value={getDisplayBalance(earnings)} />
              <Label text={`≈ $${earnedInDollars}`} color="#ffffff" /> */}
<div className="wheat2">
              <Value value={"$0.0000"}/>
              </div>
              <Label text={`≈ $0.00`} color="#ffffff" />
              <Label text="SCT Earned" color="#ffffff" />
            </StyledCardHeader>
            <StyledCardActions>
              <Button
              className="btn btn-disabled"
                onClick={onReward}
                color="primary"
                variant="contained"
                // disabled={earnings.eq(0) || !canClaimReward}
                disabled={ true }
              >
                Claim Reward
              </Button>
            </StyledCardActions>
          </StyledCardContentInner>
        </div>
      </div>
      <Box mt={2} style={{ color: '#FFF' }}>
        {canClaimReward ? (
          ''
        ) : (
          <Card>
            <CardContent>
              <Typography style={{ textAlign: 'center' }}>Claim possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={to} description="Claim available in" />
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;
