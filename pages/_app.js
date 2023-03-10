import '../styles/globals.css'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
