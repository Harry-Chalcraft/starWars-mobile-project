import { View } from 'react-native';
import styled from 'styled-components';
import { sizes, colors } from '../theme/constants';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../theme/metrics';

const Wrapper = styled(View)`
  border: ${moderateScale(sizes.tiny)}px solid ${colors.primary};
  border-radius: ${moderateScale(sizes.small)}px;
  margin-vertical: ${verticalScale(sizes.small)}px;
  padding-vertical: ${verticalScale(sizes.small)}px;
  padding-horizontal: ${horizontalScale(sizes.small)}px;
`;

export default Wrapper;
