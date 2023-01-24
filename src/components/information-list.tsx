import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { Row, Text } from '.';

interface Props {
  info: { label: string; content?: string | number }[];
}

const InformationList = (props: Props): ReactElement => {
  const { info } = props;
  return (
    <>
      {info?.map((item, index) => (
        <View key={index}>
          {item.content && (
            <Row>
              <Text bold>{item.label}</Text>
              <Text>{item.content}</Text>
            </Row>
          )}
        </View>
      ))}
    </>
  );
};

export default InformationList;
