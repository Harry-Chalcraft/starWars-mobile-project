import { gql } from '@apollo/client';

export const getAllEpisodes = gql`
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

export const getEpisode = gql`
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

export const getCharacter = gql`
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
