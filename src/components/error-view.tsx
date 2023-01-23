import React, { FC } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { SafeAreaView, Text } from '.';

const MessageWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorView: FC = () => {
  return (
    <SafeAreaView>
      <MessageWrapper>
        <Text bold alignSelf>
          A Problem there seems to be...
        </Text>
      </MessageWrapper>
    </SafeAreaView>
  );
};

export default ErrorView;
