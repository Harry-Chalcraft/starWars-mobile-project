import 'react-native-gesture-handler';
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Navigator from './src/navigator';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache(),
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
