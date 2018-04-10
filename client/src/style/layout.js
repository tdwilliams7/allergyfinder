import styled from 'styled-components';

export const Flexrow = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 1px;
  align-items: center;
  justify-content: center;
`;

export const Flexcolumn = styled.div`
  text-align: center;
  width: ${props => props.size / 12 * 100}%;
`;
