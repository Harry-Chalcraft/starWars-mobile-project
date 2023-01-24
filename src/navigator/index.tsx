/* eslint-disable react/no-unstable-nested-components */
import 'react-native-gesture-handler';
import React, { ReactElement } from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import EpisodeList from '../Screens/home/episode-list-tab';
import FavouriteCharacters from '../Screens/home/favourite-character-tab';
import Episode from '../Screens/episode';
import Character from '../Screens/character';

import { colors, sizes } from '../theme/constants';
import { moderateScale } from '../theme/metrics';

export type StackNavigatorParams = {
  EpisodeList: undefined;
  Episode: {
    filmId: string;
  };
  Character: {
    personId: string;
    isFromFavouriteCharacters?: boolean;
  };
};

const RootTabs = createBottomTabNavigator();
const Stack = createStackNavigator<StackNavigatorParams>();

const headerOptions: StackNavigationOptions = {
  headerTintColor: `${colors.primary}`,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: `${colors.black}`,
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerTitleStyle: {
    fontFamily: `${Platform.OS === 'ios' ? 'Menlo' : 'monospace'}`,
    fontSize: moderateScale(sizes.fontSize.medium),
  },
  headerTitleAlign: 'center',
};

const tabBarOptions: BottomTabNavigationOptions = {
  headerTintColor: `${colors.primary}`,
  headerStyle: {
    backgroundColor: `${colors.black}`,
    shadowColor: 'transparent',
    elevation: 0,
  },
  unmountOnBlur: true,
  tabBarActiveTintColor: `${colors.primary}`,
  tabBarStyle: {
    backgroundColor: `${colors.grey}`,
    borderTopWidth: 0,
  },
  tabBarLabelStyle: {
    fontFamily: `${Platform.OS === 'ios' ? 'Menlo' : 'monospace'}`,
    fontSize: moderateScale(sizes.fontSize.small),
  },
  headerTitleStyle: {
    fontFamily: `${Platform.OS === 'ios' ? 'Menlo' : 'monospace'}`,
    fontSize: moderateScale(sizes.fontSize.medium),
  },
  headerTitleAlign: 'center',
};

const StackNavigator = (): ReactElement<StackNavigatorParams> => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name="EpisodeList"
        component={EpisodeList}
        options={{ title: 'Movie List' }}
      />
      <Stack.Screen
        name="Episode"
        component={Episode}
        options={{ title: 'Movie' }}
      />
      {/* Here we need to configure the Header Back Button to handle when navigating
    from the FavouriteCharacter screen since it is not in this stack */}
      <Stack.Screen
        name="Character"
        component={Character}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <HeaderBackButton
              tintColor={colors.primary}
              onPress={() => {
                if (route?.params?.isFromFavouriteCharacters) {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'FavouriteCharacters' }],
                  });
                } else {
                  navigation.goBack();
                }
              }}
            />
          ),
          title: 'Character',
        })}
      />
    </Stack.Navigator>
  );
};

const MovieIcon = ({ color, size }: { color: string; size: number }) => (
  <MaterialCommunityIcons name="movie" color={color} size={size} />
);
const CharacterIcon = ({ color, size }: { color: string; size: number }) => (
  <MaterialIcons name="group" color={color} size={size} />
);

const Navigation = (): ReactElement => {
  return (
    <RootTabs.Navigator screenOptions={tabBarOptions}>
      <RootTabs.Screen
        name="MovieNavigator"
        component={StackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Movies',
          tabBarIcon: MovieIcon,
        }}
      />
      <RootTabs.Screen
        name="FavouriteCharacters"
        component={FavouriteCharacters}
        options={{
          title: 'Favourite Characters',
          tabBarIcon: CharacterIcon,
        }}
      />
    </RootTabs.Navigator>
  );
};

export default Navigation;
