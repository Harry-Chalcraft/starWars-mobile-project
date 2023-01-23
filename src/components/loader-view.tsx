import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';
import { colors } from '../theme/constants';
import { SafeAreaView } from '.';

const LoaderWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoaderView: FC = () => {
  return (
    <SafeAreaView>
      <LoaderWrapper>
        <ActivityIndicator size="large" color={colors.primary} />
      </LoaderWrapper>
    </SafeAreaView>
  );
};

export default LoaderView;
