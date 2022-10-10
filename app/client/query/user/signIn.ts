import { gql } from '@apollo/client';

const SIGNIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

export default SIGNIN;
