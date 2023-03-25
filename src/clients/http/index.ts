import { gql } from '@apollo/client'

const GET_CHARACTERS = gql`
  query GetCharacters($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      image
    }
  }
`
export default GET_CHARACTERS
