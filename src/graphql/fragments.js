import { gql } from '@apollo/client';

export const REPOSITORY_INFO = gql`
  fragment RepositoryInfo on Repository {
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    id
    url
  }
`;

export const REVIEW_INFO = gql`
  fragment ReviewInfo on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      fullName
      id
    }
  }
`;