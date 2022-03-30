import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';

// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdrawCheck from '../../../hooks/masonry/useWithdrawCheck';

import { getDisplayBalance } from '../../../utils/formatBalance';
import Crypto11 from "../../../assets/img/crypto_tomb_cash.f2b44ef4.png"
import Fantom from "../../../assets/img/fantom.7660b7c5.svg"
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useTombFinance from '../../../hooks/useTombFinance';
import ProgressCountdown from './ProgressCountdown';
import useStakedBalanceOnMasonry from '../../../hooks/useStakedBalanceOnMasonry';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useUnstakeTimerMasonry from '../../../hooks/masonry/useUnstakeTimerMasonry';
import TokenSymbol from '../../../components/TokenSymbol';
import useStakeToMasonry from '../../../hooks/useStakeToMasonry';
import useWithdrawFromMasonry from '../../../hooks/useWithdrawFromMasonry';
import useClaimRewardTimerMasonry from '../../../hooks/masonry/useClaimRewardTimerMasonry';
const Stake: React.FC = () => {
  const tombFinance = useTombFinance();
  const [approveStatus, approve] = useApprove(tombFinance.TSHARE, tombFinance.contracts.Masonry.address);

  const tokenBalance = useTokenBalance(tombFinance.TSHARE);
  const stakedBalance = useStakedBalanceOnMasonry();
  const { from, to } = useUnstakeTimerMasonry();


  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('TSHARE', tombFinance.TSHARE);
  const tokenPriceInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  // const isOldBoardroomMember = boardroomVersion !== 'latest';

  const { onStake } = useStakeToMasonry();
  const { onWithdraw } = useWithdrawFromMasonry();
  const canWithdrawFromMasonry = useWithdrawCheck();

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'PShares'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'PShares'}
    />,
  );

  return (
    <Box>
      <div className="cemetry_cards-1" style={{ marginRight: '10rem' }}>
        <div>
          <StyledCardContentInner>
            <StyledCardHeader>
              {/* <CardIcon>
                <TokenSymbol symbol="PSHARES" />
              </CardIcon> */}
                                <div className="cemetry_images">
     <div className="rounded icons-harvest"><img src={Crypto11} width="50" height="50"/></div>
     {/* <div className="rounded icons-harvest"><img src={Fantom} width="50" height="50"/></div>  */}
   </div>
   <div className="wheat2">
              <Value value={getDisplayBalance(stakedBalance)} />
              </div>
              <Label text={`≈ $${tokenPriceInDollars}`} color="#ffffff" />
              {/* <Value value={"0.0000"} />
              <Label text={`≈ $0.00`} color="#ffffff" /> */}
              <Label text={'PSHARES Staked'} color="#ffffff" />
            </StyledCardHeader>
            <StyledCardActions>
              {approveStatus !== ApprovalState.APPROVED ? (
                <Button
                  disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                  // disabled = { true }
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px' }}
                  onClick={approve}
                  className="btn"
                >
                  Approve PSHARES
                </Button>
              ) : (
                <>
                  <IconButton disabled={!canWithdrawFromMasonry} onClick={onPresentWithdraw}>
                  {/* <IconButton disabled={ true } onClick={onPresentWithdraw}> */}
                    <RemoveIcon />
                  </IconButton>
                  <StyledActionSpacer />
                  <IconButton onClick={onPresentDeposit}>
                    <AddIcon />
                  </IconButton>
                </>
              )}
            </StyledCardActions>
          </StyledCardContentInner>
        </div>
      </div>

      <Box mt={2} style={{ color: '#FFF' }}>
        {canWithdrawFromMasonry ? (
          ''
        ) : (
          <Card>
            <CardContent>
              <Typography style={{ textAlign: 'center' }}>Stake possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={new Date(to.getTime())} description="Withdraw available in" />
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
  margin-top: 28px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
