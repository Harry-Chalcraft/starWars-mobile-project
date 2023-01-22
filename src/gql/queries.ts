import { gql } from '@apollo/client';

export const GET_ALL_EPISODES = gql`
  query getAllEpisodes {
    allFilms {
      films {
        id
        releaseDate
        title
        openingCrawl
      }
    }
  }
`;

export const GET_EPISODE = gql`
  query getEpisode($filmId: ID) {
    film(id: $filmId) {
      id
      openingCrawl
      title
      releaseDate
      speciesConnection {
        totalCount
      }
      planetConnection {
        totalCount
      }
      vehicleConnection {
        totalCount
      }
      characterConnection {
        characters {
          name
          id
        }
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query Person($personId: ID) {
    person(id: $personId) {
      name
      id
      birthYear
      height
      mass
      homeworld {
        name
      }
      filmConnection {
        films {
          id
          title
        }
      }
    }
  }
`;

export const GET_SAVED_CHARACTERS = gql`
  query {
    characters @client
  }
`;
