import React, { useMemo } from 'react';
import Crypto1 from "../../assets/img/SCT.png"
import Crypto2 from "../../assets/img/PSHARES.png"
import Crypto3 from "../../assets/img/PBOND.png"
import useTombStats from '../../hooks/useTombStats';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';

function Stats() {
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();

  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  return (
    <>
    <div className='stats'>
  <div className='stat1'>
    <img src={Crypto1} className="crypto1"></img>
    <h1 className='wheat2'>{tombPriceInFTM ? tombPriceInFTM : '-.----'} AVAX</h1>
  </div>
  <div className='stat2'>
    <img src={Crypto2}></img>
    <h1 className='wheat2'>{tSharePriceInFTM ? tSharePriceInFTM : '-.----'} AVAX</h1>
  </div>
  <div className='stat3'>
    <img src={Crypto3}></img>
    <h1 className='wheat2'>{tBondPriceInFTM ? tBondPriceInFTM : '-.----'} AVAX</h1>
  </div>
</div>
    </>
  )
}

export default Stats