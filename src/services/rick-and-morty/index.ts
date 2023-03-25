// import { ApolloClient, InMemoryCache } from '@apollo/client'
// import { GET_CHARACTERS } from '../../clients/http'

// const client = new ApolloClient({
//   uri: 'https://rickandmortyapi.com/graphql',
//   cache: new InMemoryCache()
// })

// export const getCharacters = async () => {
//   try {
//     const { data } = await client.query({
//       query: GET_CHARACTERS
//     })
//     return data.characters.results
//   } catch (error) {
//     console.error(error)
//   }
// }
import { ApolloClient, InMemoryCache } from '@apollo/client'

const GraphQLClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
})

export default GraphQLClient
