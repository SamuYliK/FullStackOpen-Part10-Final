import { useMutation, useApolloClient } from '@apollo/client';

import { AUTHENTICATE_USER } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE_USER);

  const signIn = async ({ username, password }) => {
    const mutateData = await mutate({ variables: { credentials: { username, password } } });
    await authStorage.setAccessToken(mutateData.data.authenticate.accessToken);
    apolloClient.resetStore();
    return mutateData;
  };

  return [signIn, result];
};

export default useSignIn;