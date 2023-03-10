import React, { FC, useState, useEffect } from 'react';
import { FlatList, Switch } from 'react-native';
import styled from 'styled-components';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { GET_ALL_EPISODES } from '../../gql/queries';
import { StackNavigatorParams } from '../../navigator';
import { Film } from '../../types';
import { colors, sizes } from '../../theme/constants';
import { moderateScale } from '../../theme/metrics';
import {
  SafeAreaView,
  ScrollView,
  Row,
  Text,
  Card,
  LoaderView,
  ErrorView,
} from '../../components';

type Data = {
  allFilms: {
    films: Film[];
  };
};

const StyledSwitch = styled(Switch)`
  border: ${moderateScale(sizes.tiny)}px solid ${colors.primary};
`;

const EpisodeList: FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<StackNavigatorParams>>();
  const { data, loading, error } = useQuery<Data>(GET_ALL_EPISODES);

  useEffect(() => {
    if (data?.allFilms?.films) {
      setFilms(data?.allFilms?.films);
    }
  }, [data]);

  const sortFilmsReverse = (filmsToSort: Film[], sortByOldest: boolean) => {
    return [...filmsToSort].sort((a, b) => {
      if (sortByOldest) {
        return moment(a.releaseDate, 'YYYY-MM-DD').diff(
          moment(b.releaseDate, 'YYYY-MM-DD'),
          'days',
        );
      } else {
        return moment(b.releaseDate, 'YYYY-MM-DD').diff(
          moment(a.releaseDate, 'YYYY-MM-DD'),
          'days',
        );
      }
    });
  };

  const onSwitchChange = () => {
    setIsEnabled(!isEnabled);
    setFilms(sortFilmsReverse(films, isEnabled));
  };

  const onCardPress = (filmId: string) => {
    navigation.navigate('Episode', { filmId });
  };

  if (loading) {
    return <LoaderView />;
  } else if (error) {
    return <ErrorView />;
  } else {
    return (
      <SafeAreaView>
        <ScrollView>
          <Row alignItemsCentered justifyContent={'flex-end'}>
            <Row justifyContent={'flex-end'}>
              <Text>Sort by: </Text>
              <Text bold>{isEnabled ? 'newest' : 'oldest'} </Text>
            </Row>
            <StyledSwitch
              onValueChange={onSwitchChange}
              value={isEnabled}
              thumbColor={colors.primary}
              ios_backgroundColor={colors.grey}
              trackColor={{ false: colors.grey, true: colors.grey }}
              style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
            />
          </Row>
          <FlatList
            data={films}
            scrollEnabled={false}
            initialNumToRender={6}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                coloredTitle
                fullBackgroundTitle
                info={[
                  {
                    label: 'Released on: ',
                    content: moment(item.releaseDate).format('DD/MM/YYYY'),
                  },
                  {
                    label: 'Plot: ',
                    content: item.openingCrawl.substring(0, 50) + '...',
                  },
                ]}
                onCardPress={onCardPress}
                id={item.id}
              />
            )}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default EpisodeList;
