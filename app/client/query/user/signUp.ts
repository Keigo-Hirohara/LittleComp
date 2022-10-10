import { gql } from '@apollo/client';

const SIGNUP = gql`
  mutation Mutation($username: String!, $password: String!, $email: String!) {
    signUp(username: $username, password: $password, email: $email) {
      token
    }
  }
`;

export default SIGNUP;
