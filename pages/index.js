import { GET_TOP_ANIME } from 'utils/graphql/Queries'
import { useEffect } from "react";
import { client } from "./_app";

const Home = ({ topAnime }) => {

  useEffect(() => {
    console.log(topAnime)
  }, [])

  return (
    <div>Home</div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_TOP_ANIME,
  });
  return {
    props: {
      topAnime: data,
    },
  };
}

export default Home
