import { gql } from '@apollo/client';
import { REPOSITORY_INFO, REVIEW_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_INFO}
  query GetRepositories ($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $after: String, $first: Int){
    repositories (orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, after: $after, first: $first) {
      edges {
        node {
          ...RepositoryInfo
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  ${REPOSITORY_INFO},  ${REVIEW_INFO}
  query GetSingleRepository ($id: ID!, $first: Int, $after: String){
    repository (id: $id) {
      ...RepositoryInfo
      reviews (first: $first, after: $after) {
        edges {
          node {
            ...ReviewInfo
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
      }
    }
  }
`;

export const CHECK_IF_SIGNED_IN = gql`
  ${REVIEW_INFO}
  query checkIfSignedIn($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewInfo
          }
        }
      }
    }
  }
`;