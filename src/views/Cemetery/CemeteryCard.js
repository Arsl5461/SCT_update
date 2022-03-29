import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import ProgressCountdown from './components/ProgressCountdown';
import TokenSymbol from '../../components/TokenSymbol';
import useStatsForPool from '../../hooks/useStatsForPool';
import Crypto11 from "../../assets/img/crypto_tomb_cash.f2b44ef4.png"
import Fantom from "../../assets/img/fantom.7660b7c5.svg"

const CemeteryCard = ({ bank }) => {
  const statsOnPool = useStatsForPool(bank);
  return (
    <Grid item xs={12} md={4} lg={4}>
      <div className="cemetry_cards-1" >

        <div>
          {/* <ProgressCountdown base={moment().toDate()} unix_deadline={bank.poolStartUnixtimestamp} description="Pool starts in" /> */}
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
              {/* <TokenSymbol size={50} symbol={bank.depositTokenName} /> */}
            </Box>
            <div className="cemetry_images">
<div className="rounded icons-harvest icon-mar3"><img src={Crypto11} width="50" height="50"/></div>
<div className="rounded icons-harvest"><img src={Fantom} width="50" height="50"/></div> 
</div>
            <Typography className="center wheat top" variant="h5" component="h2">
              {bank.depositTokenName}
            </Typography>

            <Typography color="wheat" className="center">
              {/* {bank.name} */}
              Deposit: <strong style={{color : "#ff4c39"}}>{bank.depositTokenName.toUpperCase()}</strong> 
              <div>Earn: <strong style={{color : "#ff4c39"}}>{` ${bank.earnTokenName}`}</strong></div>
            </Typography>

            {/* <div>
              {bank.contract.endsWith('GenesisRewardPool') ?
              (<Typography>2 Days APR <strong style={{color : "#ff4c39"}}>{bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR*2}%</strong></Typography>):
              (<Typography>Daily APR <strong style={{color : "#ff4c39"}}>{bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%</strong></Typography>)}
            </div> */}
            <div>
              {bank.contract.endsWith('GenesisRewardPool')&&<Typography>Deposit Fee <strong style={{color : "#ff4c39"}}>0.9%</strong></Typography>}
            </div>

          </Box>
        </div>
        <CardActions style={{ paddingTop:"0px", justifyContent: 'flex-end' }}>
        {/* <Button color="primary" size="small" variant="contained" target="_blank" href={`${bank.site}`}>
          ↗
        </Button> */}
          {/* <Button style={{margin:'0px 10px 10px 10px'}} color="primary" size="midium" variant="contained" target="_blank" href={`${bank.buyLink}`}>
            Buy
          </Button> */}
          <Button className="btn"  color="primary"  variant="contained" component={Link} to={`/cemetry/${bank.contract}`}>
            View
          </Button>
          {/* <button className="btn mar"  variant="contained" component={Link} to={`/cemetry/${bank.contract}`}>View</button> */}
        </CardActions>
      </div>
    </Grid>
  );
};

export default CemeteryCard;
