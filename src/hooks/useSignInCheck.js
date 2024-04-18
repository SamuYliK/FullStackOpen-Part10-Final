import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CHECK_IF_SIGNED_IN } from '../graphql/queries';

const useSignInCheck = (reviews) => {
  const [user, setUser] = useState();
  const [reviewInfo, setReviewInfo] = useState(false);

  useEffect(() => {
    if(reviews){
      setReviewInfo(true);
    }
  }, [reviews]);

  const { data, refetch } = useQuery(CHECK_IF_SIGNED_IN, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: reviewInfo }
  });

  useEffect(() => {
    if (data) setUser(data.me);
  }, [data]);

  return { user, refetch };
}

export default useSignInCheck;