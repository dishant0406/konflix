import { GET_TOP_ANIME, GET_RECENT_ANIME } from 'utils/graphql/Queries'
import { client } from "./_app";
import { useState, useEffect } from 'react';
import { Hero, TrendingWeek, RecentAnimes } from 'components'
import { ClipLoader } from 'react-spinners'
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md'

const Home = ({ topAnime, recentEpisodes }) => {
  const [topAnimes, setTopAnimes] = useState(topAnime?.topAnime)
  const [selectedAnime, setSelectedAnime] = useState(topAnimes[0])
  const [hasNextPage, setHasNextPage] = useState(recentEpisodes.recentEpisodes.length)
  const [recentEpi, setRecentEpisodes] = useState(recentEpisodes.recentEpisodes)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleNextPage = async () => {
    if (hasNextPage) {
      setLoading(true)
      const { data: recentEpisodes } = await client.query({
        query: GET_RECENT_ANIME,
        variables: {
          page: page + 1
        }
      })
      setRecentEpisodes(recentEpisodes.recentEpisodes)
      setHasNextPage(recentEpisodes.recentEpisodes?.length ? true : false)
      setPage(page + 1)
      setLoading(false)
    }
  }

  const handlePreviousPage = async () => {
    if (page > 1) {
      setLoading(true)
      const { data: recentEpisodes } = await client.query({
        query: GET_RECENT_ANIME,
        variables: {
          page: page - 1
        }
      })
      setRecentEpisodes(recentEpisodes.recentEpisodes)
      setHasNextPage(recentEpisodes.recentEpisodes?.length ? true : false)
      setPage(page - 1)
      setLoading(false)
    }
  }

  useEffect(() => {
    const getAnime = async () => {
      const { data: topAnime } = await client.query({
        query: GET_TOP_ANIME,
        variables: {
          page: 1
        }
      });

      const { data: recentEpisodes } = await client.query({
        query: GET_RECENT_ANIME
      })

      setTopAnimes(topAnime?.topAnime)
      setSelectedAnime(topAnimes[0])
      setRecentEpisodes(recentEpisodes.recentEpisodes)
      setHasNextPage(recentEpisodes.recentEpisodes?.length ? true : false)
    }

    getAnime()

  }, [])


  return (
    <div className='bg-black index relative'>
      <div className='fixed top-[40%] right-[48%]'>
        <ClipLoader loading={loading} color={'#fff'} size={50} />
      </div>
      <div className={`min-h-[100vh] ${loading && 'opacity-50'} w-[100vw] pb-[125px] bg-[#05161e]`}>
        <Hero selectedAnime={selectedAnime} setSelectedAnime={setSelectedAnime} topAnimes={topAnimes} />
        <TrendingWeek topAnimes={topAnimes} />
        <RecentAnimes recentAnimes={recentEpi} />

        <div className='w-[100vw] gap-[1rem] flex justify-center'>
          <button disabled={page == 1} style={{
            //glassmorphism
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 100, 0.69 )',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba( 0,0,0,0.05)'
          }} className={`text-white ${page == 1 && 'opacity-[0.3]'} py-2 mt-[2rem] px-2 rounded-lg`} onClick={handlePreviousPage}>
            <MdOutlineNavigateBefore className='text-white' />
          </button>
          <button style={{
            //glassmorphism
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 100, 0.69 )',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba( 0,0,0,0.05)'
          }} className={`text-white ${!hasNextPage && 'opacity-[0.3]'} py-2 mt-[2rem] px-2 rounded-lg`} onClick={handleNextPage}>
            <MdOutlineNavigateNext className='text-white' />
          </button>

        </div>
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
