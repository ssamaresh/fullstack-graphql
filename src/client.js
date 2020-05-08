import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'
import { typeDefs, resolvers } from './pages/Pets'


const link = new HttpLink({uri: 'http://localhost:4000/'});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers
});

// const characters = gql `
//   {
//     characters {
//       results {
//         name
//         id
//       }
//     }
//   }
// `;

// client.query({query: characters})
//   .then(result => console.log(result));

export default client
