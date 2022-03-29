import React from 'react';

//Graveyard ecosystem logos
import SCTLogo from '../../assets/img/SCT.png';
import pSharesLogo from '../../assets/img/PSHARES.png';
import tombLogoPNG from '../../assets/img/SCT.png';
import tShareLogoPNG from '../../assets/img/PSHARES.png';
import pBondLogo from '../../assets/img/PBOND.png';

import tombFtmLpLogo from '../../assets/img/SCT-WAVAX.png';
import tshareFtmLpLogo from '../../assets/img/PSHARES-WAVAX.png';

import wftmLogo from '../../assets/img/avax.png';
// import booLogo from '../../assets/img/spooky.png';
import belugaLogo from '../../assets/img/USDT.png';
import twoshareLogo from '../../assets/img/t_2SHARE-01.png';
import twoombLogo from '../../assets/img/t_2OMB-01.png';
// import zooLogo from '../../assets/img/zoo_logo.svg';
// import shibaLogo from '../../assets/img/shiba_logo.svg';
import usdcLogo from '../../assets/img/USDC.png';
import joeLogo from '../../assets/img/JOE.png';
// import TwoombLPLogo from '../../assets/img/2OMB-WAVAX.png';
// import TwosharesLPLogo from '../../assets/img/2SHARES-WAVAX.png';
// import TwoombTwosharesLPLogo from '../../assets/img/2OMB-2SHARES.png';

import ThreeombLPLogo from '../../assets/img/SCT-WAVAX.png';
import ThreesharesLPLogo from '../../assets/img/PSHARES-WAVAX.png';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  TOMB: SCTLogo,
  SCT: SCTLogo,
  TOMBPNG: tombLogoPNG,
  TSHAREPNG: tShareLogoPNG,
  TSHARE: pSharesLogo,
  PSHARES: pSharesLogo,
  TBOND: pBondLogo,
  PBOND: pBondLogo,
  WAVAX: wftmLogo,
  // BOO: booLogo,
  // SHIBA: shibaLogo,
  // ZOO: zooLogo,
  USDT: belugaLogo,
  JOE: joeLogo,
  USDC: usdcLogo,
  // '2OMB-WAVAX LP': TwoombLPLogo,
  // '2SHARES-WAVAX LP': TwosharesLPLogo,
  // '2OMB-2SHARES LP': TwoombTwosharesLPLogo,

  'SCT-WAVAX LP': ThreeombLPLogo,
  'PSHARES-WAVAX LP': ThreesharesLPLogo,


  'wAVAX': wftmLogo,
  '2OMB': twoombLogo,
  '2SHARES': twoshareLogo,
  'TOMB-AVAX-LP': tombFtmLpLogo,
  'TSHARE-AVAX-LP': tshareFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 80 }) => {
  if (!logosBySymbol[symbol]) {
    return <img src={logosBySymbol['SCT']} alt={`${symbol} Logo`} width={size} height={size} />
    // throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
