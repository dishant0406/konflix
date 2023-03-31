import '../styles/globals.css'
import ApolloClient from "apollo-boost";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Router from "next/router";
import { useState, useEffect } from 'react'
import 'vidstack/styles/defaults.css';
import "plyr-react/plyr.css"
import { SEO } from '@/components';

export const client = new ApolloClient({
  uri: 'https://api.konflix.xyz/graphql/',
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
  //incease timeout
  fetchOptions: {
    timeout: 60 * 1000 * 5,
  },

});

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <div className='relative' >
      {loading && <div className='fixed  z-[100] top-[45%] right-[45%]'>
        <img className='h-[100px]' src='/Images/loading.webp' />
      </div>}
      <SEO />
      <div className={`${loading && 'opacity-70'}`}>
        <Component {...pageProps} />
      </div>
    </div>
  )
}
