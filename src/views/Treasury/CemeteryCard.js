import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import useTotalTreasuryBalance from '../../hooks/useTotalTreasuryBalance.js';

import TokenSymbol from '../../components/TokenSymbol';

const CemeteryCard = ({ bank }) => {
  const prices = useTotalTreasuryBalance()

  return (
    
      <div className="cemetry_cards-1">
        <CardContent>
          <Box style={{ position: 'relative' }}>
            <Box
              style={{
                position: 'absolute',
                right: '0px',
                top: '-5px',
                height: '48px',
                width: '48px',
                borderRadius: '40px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* <TokenSymbol size={32} symbol={bank.depositTokenName} /> */}
            </Box>
          </Box>
        </CardContent>
      </div>
    
  );
};

export default CemeteryCard;
