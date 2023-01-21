import React, { FC } from 'react';
import { Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EpisodeNavigatorParams } from '../../navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from '@apollo/client';
import { getAllEpisodes } from '../../gql/queries';

const EpisodeList: FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<EpisodeNavigatorParams>>();
  const { data, loading } = useQuery(getAllEpisodes);
  console.log('totoDATA', data);
  console.log('totoloading', loading);

  return (
    <>
      <Text>EPISODELISTSCREEN</Text>
      <Button
        title="gotoepisode"
        onPress={() => {
          console.log('totoonpress');
          navigation.navigate('Episode');
        }}
      />
    </>
  );
};

export default EpisodeList;
