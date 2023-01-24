import React, { ReactElement, useEffect, useState } from 'react';
import { View, FlatList, BackHandler } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import {
  useNavigation,
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

import { StackNavigatorParams } from '../navigator';
import { useQuery } from '@apollo/client';
import { GET_CHARACTER, GET_SAVED_CHARACTERS } from '../gql/queries';
import { ADD_CHARACTER, DELETE_CHARACTER } from '../gql/mutations';

import styled from 'styled-components';
import { sizes, colors } from '../theme/constants';
import { Character } from '../types';
import { useMutation } from '@apollo/client';
import { verticalScale, horizontalScale } from '../theme/metrics';

import {
  SafeAreaView,
  ScrollView,
  Text,
  InformationList,
  Wrapper,
  Card,
  LoaderView,
  ErrorView,
  Row,
} from '../components';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withDelay,
} from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/FontAwesome';

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
      params: { personId, isFromFavouriteCharacters },
    },
  } = props;
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [character, setCharacter] = useState<Character>();
  const [isCharacterSaved, setIsCharacterSaved] = useState<boolean>();

  const { data, loading, error } = useQuery<Data>(GET_CHARACTER, {
    variables: { personId },
  });
  const { data: savedCharactersData } = useQuery(GET_SAVED_CHARACTERS);
  const [addCharacter] = useMutation(ADD_CHARACTER);
  const [deleteCharacter] = useMutation(DELETE_CHARACTER);

  useEffect(() => {
    const backAction = () => {
      if (isFromFavouriteCharacters) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'FavouriteCharacters' }],
        });
      } else {
        navigation.goBack();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation, isFromFavouriteCharacters]);

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
  const handleLikeButton = () => {
    if (isCharacterSaved) {
      deleteCharacter({ variables: { id: character?.id } });
    } else {
      addCharacter({
        variables: { id: character?.id, name: character?.name },
      });
    }
    launchAnimation();
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

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rSrtle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
    opacity: opacity.value,
    alignSelf: 'center',
    position: 'absolute',
  }));

  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  const launchAnimation = () => {
    scale.value = withTiming(
      1,
      {
        duration: 1000,
      },
      isFinished => {
        if (isFinished) {
          scale.value = withDelay(
            500,
            withTiming(0, {
              duration: 1000,
            }),
          );
        }
      },
    );

    opacity.value = withTiming(
      1,
      {
        duration: 1000,
      },
      isFinished => {
        if (isFinished) {
          opacity.value = withDelay(
            500,
            withTiming(0, {
              duration: 1000,
            }),
          );
        }
      },
    );
  };
  const iconStyle = { marginRight: verticalScale(sizes.medium) };
  const flexedViewStyle = { flex: 1 };
  const textStyle = {
    marginTop: horizontalScale(sizes.medium),
  };

  if (loading) {
    return <LoaderView />;
  } else if (error) {
    return <ErrorView />;
  } else {
    return (
      <SafeAreaView>
        <TapGestureHandler numberOfTaps={2} onActivated={handleLikeButton}>
          <ScrollView>
            {character ? (
              <>
                <Wrapper>
                  <VerticalMargin>
                    <Text bold alignSelf large>
                      {character?.name}
                    </Text>
                  </VerticalMargin>
                  <Row justifyContent="space-between" alignItemsCentered>
                    <View style={flexedViewStyle}>
                      {info && <InformationList info={info} />}
                    </View>
                    <Icon
                      onPress={handleLikeButton}
                      name={isCharacterSaved ? 'heart' : 'heart-o'}
                      size={40}
                      color={colors.primary}
                      style={iconStyle}
                    />
                  </Row>
                  <Animated.View>
                    <AnimatedIcon
                      name={'heart'}
                      size={200}
                      color={colors.primary}
                      style={[rSrtle]}
                    />
                  </Animated.View>
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
                <View style={textStyle}>
                  <Text bold alignSelf textAlign="center">
                    Double tap screen to{' '}
                    {isCharacterSaved ? 'delete from' : 'save to'} favourite
                    characters
                  </Text>
                </View>
              </>
            ) : (
              <Text>No data there is</Text>
            )}
          </ScrollView>
        </TapGestureHandler>
      </SafeAreaView>
    );
  }
};

export default CharacterInfo;
