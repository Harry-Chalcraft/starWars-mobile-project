import { gql } from '@apollo/client';

export const ADD_CHARACTER = gql`
  mutation addCharacter($id: ID!, $name: String) {
    addCharacter(id: $id, name: $name) @client
  }
`;

export const DELETE_CHARACTER = gql`
  mutation deleteCharacter($id: ID!) {
    deleteCharacter(id: $id) @client
  }
`;
