import { View } from 'react-native';
import styled from 'styled-components';
import { colors, sizes } from '../theme/constants';
import { verticalScale } from '../theme/metrics';

interface Props {
  fullBackground?: boolean;
  alignItemsCentered?: boolean;
  justifyContent?: string;
}

const Row = styled(View)<Props>`
  flex-direction: row;
  flex: 1;
  background-color: ${({ fullBackground }): string =>
    fullBackground ? colors.primary : 'none'};
  align-items: ${({ alignItemsCentered }): string =>
    alignItemsCentered ? 'center' : 'flex-start'};
  justify-content: ${({ justifyContent }): string =>
    justifyContent ? justifyContent : 'flex-start'};
  display: flex;
  margin-vertical: ${verticalScale(sizes.tiny)}px;
`;

export default Row;
