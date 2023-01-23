import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { sizes } from '../constants';
import { horizontalScale, verticalScale } from '../theme/metrics';

const StyledScrollView = styled(ScrollView)`
  padding-vertical: ${verticalScale(sizes.small)}px;
  padding-horizontal: ${horizontalScale(sizes.small)}px;
`;

export default StyledScrollView;
