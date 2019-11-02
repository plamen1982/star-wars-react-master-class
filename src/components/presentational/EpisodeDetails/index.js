import React from 'react';
import gql from 'graphql-tag.macro';
import { useQuery } from '@apollo/react-hooks';
import EpisodeCard from './../EpisodeCard';
import PeopleListPerEpisode from '../PeopleListPerEpisode/PeopleListPerEpisode';
import { GET_EPISODE_BY_ID } from '../../../queries';

const EpisodeDetails = props => {
  debugger;
  const {
    match: {
      params: { episodeId },
    },
  } = props;

  const { data, loading, errors, fetchMore } = useQuery(GET_EPISODE_BY_ID, {
    variables: {
      id: episodeId,
      first: 5,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (errors) {
    return <div>Error...</div>;
  }
  const { episode } = data;
  if (!episode) {
    return null;
  }
  debugger;
  const endIndexOfPeople = episode.people.edges.length - 1;
  const { cursor } = episode.people.edges[endIndexOfPeople];
  const loadMore = () => {
    fetchMore({
      variables: { first: 5, after: cursor },
      updateQuery: (prev, { fetchMoreResult: { episode } }) => {
        debugger;
        console.log('prev', prev);
        console.log('episode', episode);
        return {
          episode: {
            ...prev.episode,
            ...episode,
            people: [...prev.episode.people.edges, ...episode.people.edges],
          },
        };
      },
    });
  };

  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const episodeDirectionCard = 'horizontal';
  return (
    <div style={styles}>
      {/* ADD data atribute with current episode */}
      <EpisodeCard direction={episodeDirectionCard} data={episode}>
        {/* ADD data atribute with current people for this episode episode */}
        <PeopleListPerEpisode data={episode.people.edges} />
        <button onClick={loadMore}>Load More..</button>
      </EpisodeCard>
    </div>
  );
};
export default EpisodeDetails;
