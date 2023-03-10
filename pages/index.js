import { GET_TOP_ANIME, GET_RECENT_ANIME } from 'utils/graphql/Queries'
import { client } from "./_app";
import { useState } from 'react';
import { Hero, TrendingWeek, RecentAnimes } from 'components'



const Home = ({ topAnime, recentEpisodes }) => {
  const [topAnimes, setTopAnimes] = useState(topAnime?.topAnime)
  const [selectedAnime, setSelectedAnime] = useState(topAnimes[0])
  const [hasNextPage, setHasNextPage] = useState(recentEpisodes.recentEpisodes.hasNextPage)
  const [recentEpi, setRecentEpisodes] = useState(recentEpisodes.recentEpisodes.results)
  const [page, setPage] = useState(1)

  const handleNextPage = async () => {
    if (hasNextPage) {
      const { data: recentEpisodes } = await client.query({
        query: GET_RECENT_ANIME,
        variables: {
          page: page + 1
        }
      })
      setRecentEpisodes(recentEpisodes.recentEpisodes.results)
      setHasNextPage(recentEpisodes.recentEpisodes.hasNextPage)
      setPage(page + 1)
    }
  }

  return (
    <div className='min-h-[100vh] w-[100vw] pb-[125px] bg-[#05161e]'>
      <Hero selectedAnime={selectedAnime} setSelectedAnime={setSelectedAnime} topAnimes={topAnimes} />
      <TrendingWeek topAnimes={topAnimes} />
      <RecentAnimes recentAnimes={recentEpi} />
      <div className='w-[100vw] flex justify-center'>
        <button className='bg-[#0f2d3d] text-white py-2 mt-[2rem] px-4 rounded-lg' onClick={handleNextPage}>Next</button>

      </div>
    </div>
  )
}

export async function getStaticProps() {
  const { data: topAnime } = await client.query({
    query: GET_TOP_ANIME,
  });
  const { data: recentEpisodes } = await client.query({
    query: GET_RECENT_ANIME
  })
  return {
    props: {
      topAnime,
      recentEpisodes
    },
    revalidate: 20
  };
}

export default Home
