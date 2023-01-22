import 'react-native-gesture-handler';
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Navigator from './src/navigator';
import { GET_SAVED_CHARACTERS } from './src/gql/queries';

const cache = new InMemoryCache();

interface CharactersData {
  characters: Character[];
}
interface Character {
  id: string;
  name: string;
}

const resolvers = {
  Mutation: {
    addCharacter: (_: void, { id, name }: Character) => {
      const previousCharacters = cache.readQuery<CharactersData>({
        query: GET_SAVED_CHARACTERS,
      });
      const newCharacters = previousCharacters?.characters
        ? [...previousCharacters.characters, { id, name }]
        : [{ id, name }];
      cache.writeQuery({
        query: GET_SAVED_CHARACTERS,
        data: { characters: newCharacters },
      });
    },
    deleteCharacter: (_: void, { id }: { id: string }) => {
      const previousCharacters = cache.readQuery<CharactersData>({
        query: GET_SAVED_CHARACTERS,
      });
      const characterToDelete = previousCharacters?.characters.find(
        character => character.id === id,
      );
      if (characterToDelete) {
        const newCharacters = previousCharacters?.characters.filter(
          character => character.id !== id,
        );
        cache.writeQuery({
          query: GET_SAVED_CHARACTERS,
          data: { characters: newCharacters },
        });
      }
    },
  },
};

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache,
  resolvers,
});

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
