import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { sizes, colors } from '../constants';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../theme/metrics';

interface Props {
  alignCenter?: boolean;
  reducedWidth?: boolean;
}

const TouchableWrapper = styled(TouchableOpacity)<Props>`
  border: ${moderateScale(sizes.tiny)}px solid ${colors.primary};
  border-radius: ${moderateScale(sizes.small)}px;
  margin-vertical: ${verticalScale(sizes.small)}px;
  padding-vertical: ${verticalScale(sizes.small)}px;
  padding-horizontal: ${horizontalScale(sizes.small)}px;
  flex: 1;
  justify-content: center;
  align-self: ${({ alignCenter }): string =>
    alignCenter ? 'center' : 'stretch'};
  margin-horizontal: ${sizes.tiny}px;
  display: flex;
  width: ${({ reducedWidth }): string => (reducedWidth ? '70%' : 'auto')};
`;

export default TouchableWrapper;
