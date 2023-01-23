import { View } from 'react-native';
import styled from 'styled-components';
import { colors } from '../constants';

interface Props {
  fullBackground?: boolean;
  alignItemsCentered?: boolean;
  justifyContentCentered?: boolean;
}

const Row = styled(View)<Props>`
  flex-direction: row;
  flex: 1;
  background-color: ${({ fullBackground }): string =>
    fullBackground ? colors.primary : 'none'};
  align-items: ${({ alignItemsCentered }): string =>
    alignItemsCentered ? 'center' : 'flex-start'};
  justify-content: ${({ justifyContentCentered }): string =>
    justifyContentCentered ? 'center' : 'flex-start'};
  display: flex;
`;

export default Row;
