import React from 'react';

import styled from 'styled-components';

interface ValueProps {
  value: string;
}

const Value: React.FC<ValueProps> = ({ value }) => {
  return <StyledValue className='wheat2'>{value}</StyledValue>;
};

const StyledValue = styled.div`
  font-size: 36px;
  font-weight: 700;
`;

export default Value;
