import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { sizes } from '../theme/constants';
import { horizontalScale, verticalScale } from '../theme/metrics';

const StyledScrollView = styled(ScrollView)`
  padding-vertical: ${verticalScale(sizes.small)}px;
  padding-horizontal: ${horizontalScale(sizes.small)}px;
  flex: 1;
`;

export default StyledScrollView;
