import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { CharacterNavigatorParams } from '../navigator';
import { useQuery } from '@apollo/client';
import { getCharacter } from '../gql/queries';

type RouteProps = RouteProp<CharacterNavigatorParams, 'Character'>;
export interface Props {
  route: RouteProps;
}

const Character = (props: Props): ReactElement => {
  const {
    route: {
      params: { personId },
    },
  } = props;
  const { data } = useQuery(getCharacter, {
    variables: { personId },
  });
  console.log('totocharacterId', personId);
  console.log('totodata', data);
  return <Text>Character</Text>;
};

export default Character;
