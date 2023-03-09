import '../styles/globals.css'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

export const client = new ApolloClient({
  uri: 'http://localhost:9000/graphql/',
});

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
