import { Text, Platform } from 'react-native';
import styled from 'styled-components';
import { sizes, colors } from '../theme/constants';
import { moderateScale } from '../theme/metrics';

interface Props {
  colored?: boolean;
  bold?: boolean;
  alignSelf?: boolean;
  large?: boolean;
  textAlign?: string;
}

const StyledText = styled(Text)<Props>`
  color: ${({ colored }): string => (colored ? colors.black : colors.primary)};
  font-weight: ${({ bold }): string => (bold ? 'bold' : 'normal')};
  align-self: ${({ alignSelf }): string =>
    alignSelf ? 'center' : 'flex-start'};
  font-size: ${({ large }): number =>
    large
      ? moderateScale(sizes.fontSize.large)
      : moderateScale(sizes.fontSize.medium)}px;
  font-family: ${Platform.OS === 'ios' ? 'Menlo' : 'monospace'};
  text-align: ${({ textAlign }): string => (textAlign ? textAlign : 'auto')};
`;

export default StyledText;
