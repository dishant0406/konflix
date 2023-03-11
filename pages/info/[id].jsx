import {GET_SINGLE_ANIME} from 'utils/graphql/Queries'
import { client } from "pages/_app";
import { AnimeHero } from '@/components';


const WatchAnime = ({anime}) => {
  console.log(anime)
  return (
    <div>
      <AnimeHero anime={anime}/>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  let data = null


  const obj = await client.query({
    query: GET_SINGLE_ANIME,
    variables: {
      animeDetailsId: id,
    },
    //ignore error
    errorPolicy: 'all',

  });

  if(obj.data?.animeDetails===null){
    return {
      notFound: true,
    }
  }

  data = obj.data
  return {
    props: {
      anime: data,
    },
  }
}

export default WatchAnime