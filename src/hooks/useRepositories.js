import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedOrdering, searchKeyword, first) => {
  const [orderDirection, setOrderDirection] = useState();
  const [orderBy, setOrderBy] = useState();

  useEffect(() => {
    if (!selectedOrdering){
      setOrderDirection('DESC');
      setOrderBy('CREATED_AT');
    } else if (selectedOrdering === 'highest') {
      setOrderDirection('DESC');
      setOrderBy('RATING_AVERAGE');
    } else if (selectedOrdering === 'lowest') {
      setOrderDirection('ASC');
      setOrderBy('RATING_AVERAGE');
    } else {
      setOrderDirection('DESC');
      setOrderBy('CREATED_AT');
    }
  }, [selectedOrdering]);

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { orderDirection, orderBy, searchKeyword, first },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if(!canFetchMore){
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        variables: { orderDirection, orderBy, searchKeyword, first },
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepositories;