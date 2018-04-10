import styled from 'styled-components';

export const Flexrow = styled.div`
  display: flex;
`;

export const Flexcolumn = styled.div`
  text-align: center;
  width: ${props => props.size / 12 * 100}%;
`;
