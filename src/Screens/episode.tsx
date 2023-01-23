import React, { ReactElement, useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { GET_EPISODE } from '../gql/queries';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import styled from 'styled-components';
import { Film } from '../types';
import { sizes } from '../theme/constants';

import { StackNavigatorParams } from '../navigator';

import {
  SafeAreaView,
  ScrollView,
  Wrapper,
  Card,
  Text,
  InformationList,
  LoaderView,
  ErrorView,
} from '../components';
import { verticalScale } from '../theme/metrics';

type RouteProps = RouteProp<StackNavigatorParams, 'Episode'>;
export interface Props {
  route: RouteProps;
}
type Data = {
  film: Film;
};

const VerticalMargin = styled(View)`
  margin-vertical: ${verticalScale(sizes.medium)}px;
`;

const Episode = (props: Props): ReactElement => {
  const {
    route: {
      params: { filmId },
    },
  } = props;
  const navigation = useNavigation<StackNavigationProp<StackNavigatorParams>>();
  const [film, setFilm] = useState<Film>();
  const { data, loading, error } = useQuery<Data>(GET_EPISODE, {
    variables: { filmId },
  });

  useEffect(() => {
    if (data?.film) {
      setFilm(data?.film);
    }
  }, [data]);

  const onCardPress = (personId: string) => {
    navigation.navigate('Character', { personId });
  };

  const info: { label: string; content?: string | number }[] = [
    {
      label: 'Released on: ',
      content: moment(film?.releaseDate).format('DD/MM/YYYY'),
    },
    {
      label: 'Number of species: ',
      content: film?.speciesConnection?.totalCount,
    },
    {
      label: 'Number of planets: ',
      content: film?.planetConnection?.totalCount,
    },
    {
      label: 'Number of vehicules: ',
      content: film?.vehicleConnection?.totalCount,
    },
    {
      label: 'Plot: ',
      content: film?.openingCrawl,
    },
  ];
  if (loading) {
    return <LoaderView />;
  } else if (error) {
    return <ErrorView />;
  } else {
    return (
      <SafeAreaView>
        <ScrollView>
          {film ? (
            <Wrapper>
              <VerticalMargin>
                <Text alignSelf bold large>
                  {film?.title}
                </Text>
              </VerticalMargin>
              {info && <InformationList info={info} />}
              <VerticalMargin>
                <Text bold>Characters: </Text>
              </VerticalMargin>
              <FlatList
                data={film?.characterConnection?.characters}
                scrollEnabled={false}
                numColumns={3}
                horizontal={false}
                initialNumToRender={50}
                renderItem={({ item }) => (
                  <Card
                    textAlignSelf
                    title={item.name}
                    onCardPress={onCardPress}
                    id={item.id}
                    key={item.id}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </Wrapper>
          ) : (
            <Text bold alignSelf>
              No data there is
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default Episode;
