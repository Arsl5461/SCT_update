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
        <div className="card_token_countdown">
            <div style={{fontSize: "20px"}}>{description} <div style={{color: "red"}}>{h.padStart(2, '0')}:{m.padStart(2, '0')}:{s.padStart(2, '0')}</div></div>
        </div>
      );
    }else{
      return "";
    }
  };
  return (
      <Countdown key={new Date().getTime()} date={new Date(deadline.getTime())} renderer={countdownRenderer} />
  );
};

export default ProgressCountdown;