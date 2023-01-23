import React, { ReactElement, useEffect, useState } from 'react';
import { View, FlatList, Button } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParams } from '../navigator';
import { useQuery } from '@apollo/client';
import { GET_CHARACTER, GET_SAVED_CHARACTERS } from '../gql/queries';
import { ADD_CHARACTER, DELETE_CHARACTER } from '../gql/mutations';

import styled from 'styled-components';
import { sizes } from '../constants';
import { Character } from '../types';
import { useMutation } from '@apollo/client';
import { verticalScale } from '../theme/metrics';

import {
  SafeAreaView,
  ScrollView,
  Text,
  InformationList,
  Wrapper,
  Card,
  LoaderView,
  ErrorView,
} from '../components';

type RouteProps = RouteProp<StackNavigatorParams, 'Character'>;
export interface Props {
  route: RouteProps;
}
type Data = {
  person: Character;
};

const VerticalMargin = styled(View)`
  margin-vertical: ${verticalScale(sizes.medium)}px;
`;

const CharacterInfo = (props: Props): ReactElement => {
  const {
    route: {
      params: { personId },
    },
  } = props;
  const navigation = useNavigation<StackNavigationProp<StackNavigatorParams>>();

  const [character, setCharacter] = useState<Character>();
  const [isCharacterSaved, setIsCharacterSaved] = useState<boolean>();

  const { data, loading, error } = useQuery<Data>(GET_CHARACTER, {
    variables: { personId },
  });
  const { data: savedCharactersData } = useQuery(GET_SAVED_CHARACTERS);
  const [addCharacter] = useMutation(ADD_CHARACTER);
  const [deleteCharacter] = useMutation(DELETE_CHARACTER);

  useEffect(() => {
    if (data?.person) {
      setCharacter(data?.person);
    }
  }, [data]);

  useEffect(() => {
    if (savedCharactersData) {
      const { characters: savedCharacters }: { characters: Character[] } =
        savedCharactersData;
      setIsCharacterSaved(
        savedCharacters.some(
          savedCharacter => savedCharacter.id === character?.id,
        ),
      );
    }
  }, [savedCharactersData, character]);

  const onCardPress = (filmId: string) => {
    navigation.navigate('Episode', { filmId });
  };
  const saveAsFavourite = () => {
    addCharacter({
      variables: { id: character?.id, name: character?.name },
    });
  };
  const handleDeleteId = () => {
    deleteCharacter({ variables: { id: character?.id } });
  };

  const info: { label: string; content?: string | number }[] = [
    {
      label: 'Birth year: ',
      content: character?.birthYear,
    },
    {
      label: 'Height: ',
      content: character?.height,
    },
    {
      label: 'Mass: ',
      content: character?.mass,
    },
    {
      label: 'Homeworld: ',
      content: character?.homeworld?.name,
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
          {character ? (
            <Wrapper>
              <VerticalMargin>
                <Text bold alignSelf large>
                  {character?.name}
                </Text>
              </VerticalMargin>
              {info && <InformationList info={info} />}
              <Text bold>Has appeared in: </Text>
              <VerticalMargin>
                <FlatList
                  data={character?.filmConnection?.films}
                  scrollEnabled={false}
                  initialNumToRender={6}
                  renderItem={({ item }) => (
                    <Card
                      alignCenter
                      reducedWidth
                      title={item.title}
                      onCardPress={onCardPress}
                      id={item.id}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </VerticalMargin>
            </Wrapper>
          ) : (
            <Text bold alignSelf>
              No data there is
            </Text>
          )}
          <Button title="save as favourite" onPress={saveAsFavourite} />
          <Button title="delete as favourite" onPress={handleDeleteId} />
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default CharacterInfo;
