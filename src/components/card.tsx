import React, { ReactElement } from 'react';
import { TouchableWrapper, Row, Text, InformationList } from '.';

interface Props {
  title: string;
  onCardPress: (id: string) => void;
  id: string;
  info?: { label: string; content: string }[];
  coloredTitle?: boolean;
  fullBackgroundTitle?: boolean;
  textAlignSelf?: boolean;
  alignCenter?: boolean;
  reducedWidth?: boolean;
}

const Card = (props: Props): ReactElement => {
  const {
    title,
    onCardPress,
    id,
    info,
    coloredTitle,
    fullBackgroundTitle,
    textAlignSelf,
    alignCenter,
    reducedWidth,
  } = props;
  return (
    <TouchableWrapper
      reducedWidth={reducedWidth}
      alignCenter={alignCenter}
      onPress={() => {
        onCardPress(id);
      }}>
      <Row justifyContent={'center'} fullBackground={fullBackgroundTitle}>
        <Text bold colored={coloredTitle} alignSelf={textAlignSelf}>
          {title}
        </Text>
      </Row>
      {info && <InformationList info={info} />}
    </TouchableWrapper>
  );
};

export default Card;
