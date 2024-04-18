import { useQuery } from '@apollo/client';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const getSingleRepository = (id, first) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id, first },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.repository.reviews.pageInfo.endCursor,
        variables: { id, first },
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default getSingleRepository;