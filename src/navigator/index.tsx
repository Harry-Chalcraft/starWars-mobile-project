import 'react-native-gesture-handler';
import React, { ReactElement } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';

import EpisodeList from '../Screens/home/episode-list-tab';
import FavouriteCharacters from '../Screens/home/favourite-character-tab';
import Episode from '../Screens/episode';
import Character from '../Screens/character';

export type EpisodeNavigatorParams = {
  EpisodeList: undefined;
  Episode: undefined;
};

export type CharacterNavigatorParams = {
  FavouriteCharacters: undefined;
  Character: {
    personId: string;
  };
};

const RootTabs = createBottomTabNavigator();
const CharacterStack = createStackNavigator<CharacterNavigatorParams>();
const EpisodeStack = createStackNavigator<EpisodeNavigatorParams>();

const EpisodeNavigator = (): ReactElement => {
  return (
    <EpisodeStack.Navigator>
      <EpisodeStack.Screen name="EpisodeList" component={EpisodeList} />
      <EpisodeStack.Screen name="Episode" component={Episode} />
    </EpisodeStack.Navigator>
  );
};

export const CharacterNavigator =
  (): ReactElement<CharacterNavigatorParams> => {
    return (
      <CharacterStack.Navigator>
        <CharacterStack.Screen
          name="FavouriteCharacters"
          component={FavouriteCharacters}
        />
        <CharacterStack.Screen name="Character" component={Character} />
      </CharacterStack.Navigator>
    );
  };

const Navigation = (): ReactElement => {
  return (
    <RootTabs.Navigator
      screenOptions={{ unmountOnBlur: true, headerShown: false }}>
      <RootTabs.Screen name="EpisodeNavigator" component={EpisodeNavigator} />
      <RootTabs.Screen
        name="CharacterNavigator"
        component={CharacterNavigator}
      />
    </RootTabs.Navigator>
  );
};

export default Navigation;
