import React, { FC } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import { useQuery } from '@apollo/client';
import { GET_SAVED_CHARACTERS } from '../../gql/queries';
import { Character } from '../../types';

import {
  SafeAreaView,
  ScrollView,
  TouchableWrapper,
  Text,
  LoaderView,
  ErrorView,
} from '../../components';

type Data = {
  characters: Character[];
};

const MessageWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FavouriteCharacters: FC = () => {
  const { data, loading, error } = useQuery<Data>(GET_SAVED_CHARACTERS);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const onPress = (personId: string) => {
    navigation.navigate('MovieNavigator', {
      screen: 'Character',
      params: { personId, isFromFavouriteCharacters: true },
    });
  };

  if (loading) {
    return <LoaderView />;
  } else if (error) {
    return <ErrorView />;
  } else {
    return (
      <SafeAreaView>
        {data?.characters.length ? (
          data.characters.map(character => (
            <ScrollView key={character.id}>
              <TouchableWrapper
                key={character.id}
                reducedWidth
                alignCenter
                onPress={() => {
                  onPress(character.id);
                }}>
                <Text bold alignSelf>
                  {character.name}
                </Text>
              </TouchableWrapper>
            </ScrollView>
          ))
        ) : (
          <MessageWrapper>
            <Text bold alignSelf>
              No favourite characters yet you have. Hmm.
            </Text>
          </MessageWrapper>
        )}
      </SafeAreaView>
    );
  }
};

export default FavouriteCharacters;
