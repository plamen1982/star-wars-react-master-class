import gql from 'graphql-tag.macro';

const GET_ALL_EPISODES = gql`
  query AllEpisodes($first: Int!, $numberPeople: Int) {
    allEpisodes(first: $first) {
      edges {
        node {
          title
          episodeId
          openingCrawl
          director
          releaseDate
          image
          people(first: $numberPeople) {
            edges {
              node {
                name
                image
              }
              cursor
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

export { GET_ALL_EPISODES };
