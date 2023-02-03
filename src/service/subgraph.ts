import { gql } from 'graphql-request';

const ETH_NAMEHASH =
  '0x070904f45402bbf3992472be342c636609db649a8ec20a8aaa65faaafd4b8701';

export const GET_DOMAINS = gql`
  query getDomains($tokenId: String) {
    domain(id: $tokenId) {
      id
      labelhash
      name
      createdAt
      parent {
        id
      }
      resolver {
        texts
        address
      }
    }
  }
`;

export const GET_DOMAINS_BY_LABELHASH = gql`
  query getDomains($tokenId: String) {
    domains(
      where: {
        parent: "${ETH_NAMEHASH}",
        labelhash: $tokenId
      }
    ) {
      id
      labelhash
      name
      createdAt
      parent {
        id
      }
      resolver {
        texts
        address
      }
    }
  }
`;

export const GET_REGISTRATIONS = gql`
  query getRegistration($labelhash: String) {
    registrations(
      orderBy: registrationDate
      orderDirection: desc
      where: { id: $labelhash }
    ) {
      labelName
      registrationDate
      expiryDate
    }
  }
`;
