import {gql} from "apollo-boost";


export const verifyTokenMutation = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      ok
      user {
        id
      }
    }
  }
`;

export const authTokenMutation = gql`
  mutation authToken($email: String!, $password: String!) {
    authToken(email: $email, password: $password) {
      ok
      token
      user {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`;

export const registerUserMutation = gql`
  mutation registerUser($inputData: RegisterInput!) {
    registerUser(inputData: $inputData) {
      ok
      token
      user {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`;
