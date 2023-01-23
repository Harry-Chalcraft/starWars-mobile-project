import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import { colors } from '../constants';

const StyledSafeAreaView = styled(SafeAreaView)`
  flex-grow: 1;
  background-color: ${colors.black};
`;

export default StyledSafeAreaView;
