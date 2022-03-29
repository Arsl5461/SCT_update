import React from 'react';
import styled from 'styled-components';
import Countdown, { CountdownRenderProps } from 'react-countdown';

import { Alert } from '@material-ui/lab';

interface AlertCountdownProps {
  base: Date;
  unix_deadline: number;
  description: string;
}

const AlertCountdown: React.FC<AlertCountdownProps> = ({ base, unix_deadline, description }) => {
  const deadline = new Date( unix_deadline * 1000 );

  const percentage =
    Date.now() >= deadline.getTime()
      ? 100
      : ((Date.now() - base.getTime()) / (deadline.getTime() - base.getTime())) * 100;

  const countdownRenderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const timestamp = ( (days * 24 + hours) * 3600 ) + (minutes * 60) + seconds;
    
    if(timestamp <= 0){
      return (
        <Alert variant="filled" severity="warning">
          {description}
        </Alert>
      );
    }else{
      return "";
    }
  };
  return (
      <Countdown key={new Date().getTime()} date={deadline} renderer={countdownRenderer} />
  );
};

export default AlertCountdown;
