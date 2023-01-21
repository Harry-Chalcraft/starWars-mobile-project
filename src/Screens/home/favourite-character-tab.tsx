import React, { FC } from 'react';
import { Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CharacterNavigatorParams } from '../../navigator';
import { StackNavigationProp } from '@react-navigation/stack';

const FavouriteCharacters: FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<CharacterNavigatorParams>>();

  return (
    <>
      <Text>FAVOURITECHARACTERSCREEN</Text>
      <Button
        title="gotocharacter"
        onPress={() => {
          navigation.navigate('Character');
        }}
      />
    </>
  );
};

export default FavouriteCharacters;
