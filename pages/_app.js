import '../styles/globals.css'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const client = new ApolloClient({
  uri: 'http://localhost:9000/graphql/',
  //ignore graphql errors
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  },





});

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
