import React from 'react';
import styled from 'styled-components';
import Countdown, { CountdownRenderProps } from 'react-countdown';

interface ProgressCountdownProps {
  base: Date;
  unix_deadline: number;
  description: string;
}

const ProgressCountdown: React.FC<ProgressCountdownProps> = ({ base, unix_deadline, description }) => {
  const deadline = new Date( unix_deadline * 1000 );

  const percentage =
    Date.now() >= deadline.getTime()
      ? 100
      : ((Date.now() - base.getTime()) / (deadline.getTime() - base.getTime())) * 100;

  const countdownRenderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const timestamp = ( (days * 24 + hours) * 3600 ) + (minutes * 60) + seconds;
    const h = String(days * 24 + hours);
    const m = String(minutes);
    const s = String(seconds);
    
    if(timestamp > 0){
      return (
            <div>{description} <strong style={{color: "#ff4c39", fontSize: "15px"}}>{h.padStart(2, '0')}:{m.padStart(2, '0')}:{s.padStart(2, '0')}</strong></div>
      );
    }else{
      return "";
    }
  };
  return (
      <Countdown key={new Date().getTime()} date={deadline} renderer={countdownRenderer} />
  );
};

export default ProgressCountdown;
