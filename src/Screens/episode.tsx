import React, { FC } from 'react';
import { Text, Button } from 'react-native';
import { useQuery } from '@apollo/client';
import { getEpisode } from '../gql/queries';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { CharacterNavigatorParams } from '../navigator';
import { StackNavigationProp } from '@react-navigation/stack';

const Episode: FC = () => {
  const navigation =
    // useNavigation<StackNavigationProp<CharacterNavigatorParams>>();
    useNavigation<NavigationProp<ParamListBase>>();

  const { data } = useQuery(getEpisode, {
    variables: { filmId: 'ZmlsbXM6Mw==' },
  });
  console.log('totodata', data);
  return (
    <>
      <Text>Episode</Text>
      <Button
        title="gotocharacter"
        onPress={() => {
          console.log('totoonpress');
          navigation.navigate('CharacterNavigator', {
            screen: 'Character',
            params: { personId: 'cGVvcGxlOjE=' },
          });
        }}
      />
    </>
  );
};

export default Episode;
