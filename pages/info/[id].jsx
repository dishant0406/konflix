import {GET_SINGLE_ANIME} from 'utils/graphql/Queries'
import { client } from "pages/_app";
import { AnimeHero } from '@/components';
import { poppinsBold } from '@/utils/Fonts/fonts';
import dynamic from 'next/dynamic'
import { AiFillYoutube } from 'react-icons/ai'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const WatchAnime = ({anime}) => {
  return (
    <div className='bg-[#05161e] min-h-[100vh] pb-[50px]'>
      <AnimeHero anime={anime}/>
      <div className='w-[100vw]  mt-[10rem] md:mt-[1rem] flex justify-center'>
        <div className='mt-[6rem] w-[90vw]'>
            <p style={{
              textShadow: '0px 0px 10px rgba(0,0,0,1)'
            }} className={`${poppinsBold.className}  opacity-25 text-[18px] md:text-[20px] tracking-tight font-bold  text-white`}>
              DESCRIPTION
            </p>

            <p style={{
              textShadow: '0px 0px 10px rgba(0,0,0,1)'
            }} className={`${poppinsBold.className} transition-all duration-300 text-[14px] md:text-[16px] tracking-tight font-bold mb-[1rem] text-white`}>
              {anime?.animeDetails?.description}
            </p>
        </div>
      </div>
      <div className='w-[100vw] flex justify-center'>
        <div className=' md:mt-[1rem] w-[90vw]'>
            <p style={{
              textShadow: '0px 0px 10px rgba(0,0,0,1)'
            }} className={`${poppinsBold.className}  opacity-25 text-[18px] md:text-[20px] tracking-tight font-bold  text-white`}>
              TRAILER
            </p>
            <div className='rounded-[10px] overflow-hidden'>
            <ReactPlayer playIcon={
              <div>
                <div className={` bg-white scale-150 hover:scale-125 transition-all duration-300`}>
                  <AiFillYoutube className='text-[#38a835] scale-[3]' />
                </div>
              </div>
            }  style={{
              boxShadow: '0px 0px 10px rgba(0,0,0,1)',             
            }} width={'90vw'}  light={true} url={anime.animeDetails.trailer}/>
            </div>
        </div>
      </div>

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
    //header timeout time incease
    fetchOptions: {
      timeout: 60*1000*5,
    },



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