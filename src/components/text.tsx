import { Text } from 'react-native';
import styled from 'styled-components';
import { sizes, colors } from '../constants';
import { moderateScale } from '../theme/metrics';

interface Props {
  colored?: boolean;
  bold?: boolean;
  alignSelf?: boolean;
  large?: boolean;
}

const StyledText = styled(Text)<Props>`
  color: ${({ colored }): string => (colored ? colors.black : colors.primary)};
  font-weight: ${({ bold }): string => (bold ? 'bold' : 'normal')};
  font-size: ${moderateScale(sizes.fontSize.medium)}px;
  align-self: ${({ alignSelf }): string =>
    alignSelf ? 'center' : 'flex-start'};
  font-size: ${({ large }): number =>
    large ? sizes.fontSize.large : sizes.fontSize.medium}px;
`;

export default StyledText;
