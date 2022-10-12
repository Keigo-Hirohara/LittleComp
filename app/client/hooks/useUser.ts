import { useMutation, useQuery } from '@apollo/client';
import { useCallback } from 'react';
import SIGNIN from '../query/user/signIn';
import SIGNUP from '../query/user/signUp';
import Cookies from 'cookies-ts';
import { GET_USER } from '../query/user/getUser';

export const useUser = () => {
  const [signUpMutation] = useMutation(SIGNUP);
  const [signInMutation] = useMutation(SIGNIN);
  const getUser = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
  });
  const cookies = new Cookies();

  const signUp = useCallback(async ({ username, email, password }: any) => {
    return await signUpMutation({
      variables: {
        username,
        email,
        password,
      },
    });
  }, []);
  const signIn = useCallback(async ({ email, password }: any) => {
    return await signInMutation({
      variables: {
        email,
        password,
      },
    });
  }, []);

  return {
    getUser,
    signUp,
    signIn,
    cookies,
  };
};
