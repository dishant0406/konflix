
import { FaPlay } from 'react-icons/fa'
import {poppinsBold,poppinsMedium} from 'utils/Fonts/fonts'
import {Search} from 'components'



const InfoCard = ({type, title})=>{
  
  return (
    <div style={{
      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba( 0,0,0,0.01)'
    }} className={`w-[120px] md:w-[200px] flex items-center justify-center cursor-pointer transition-all duration-300  ${true ? ' scale-110' : 'opacity-50'} h-[80px] md:h-[120px] rounded-[10px]  md:rounded-[20px]`}>
      <p className={`${poppinsMedium.className} text-white absolute left-[-10px] md:left-[-15px] -rotate-90 opacity-50 text-[8px] md:text-[12px]`}>
        {type}
      </p>
      <p className={`${poppinsBold.className}  text-white text-[14px] md:text-[24px]`}>
       {title}
      </p>
    </div>
  )
}

const Play = ()=>{
  return (
    <div className={`w-[200px] bg-[#39a936] hover:scale-[1.15] flex items-center justify-center cursor-pointer transition-all duration-300  border-white border-[2px] scale-110 h-[120px]  rounded-[20px]`}>
              <FaPlay className='text-white scale-[2]' />
            </div>
  )
}

export function getYoutubeId(url) {
  // Regular expression to match the video ID
  var pattern = /(?:\/embed\/|watch\?v=)([\w-]{11})/;

  // Test the URL against the pattern
  var match = url.match(pattern);

  // Return the video ID if a match is found, otherwise return null
  return match ? match[1] : null;
}


const AnimeHero = ({anime}) => {
  return (
    <div className='w-[100vw] transition-all duration-300 items-center h-[50vh] flex flex-col justify-between ' style={{
      backgroundImage: `url(${anime.animeDetails.trailer?`https://img.youtube.com/vi/${getYoutubeId(anime.animeDetails.trailer)}/maxresdefault.jpg`:anime?.animeDetails?.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      //shadow from bottom 
      boxShadow: '0px -40px 45px -1px rgba(5,22,30,1) inset'
    }}>


      <Search/>
      <div className='w-[90vw]'>
        <p style={{
          textShadow: '0px 0px 10px rgba(0,0,0,1)'
        }} className={`${poppinsBold.className} transition-all duration-300 text-[38px] md:text-[56px] tracking-tight font-bold  text-white`}>
          {anime?.animeDetails?.title.toUpperCase()}
        </p>
        <div className='flex mb-[2rem] gap-[10px]'>
          {
            anime?.animeDetails?.genres?.map((genre, index) => {
              return (
                <div className='bg-[#686868] text-white border border-white rounded-md px-[5px] py-[2px]'>
                  <p className={`${poppinsMedium.className} text-[14px]`}>
                    {genre}
                  </p>
                </div>
              )
            })
          }
        </div>
        <div className='w-[90vw] bg-[] flex flex-wrap justify-center gap-[40px]  mb-[-3rem]  '>
            <div className='md:w-[200px] md:inline-block md:mt-[0] mt-[2rem] w-[300px] flex justify-center'>
              <Play />
            </div>
            <InfoCard title={anime?.animeDetails?.subOrDub==='sub' ? 'SUBBED' : 'DUBBED'} type='AUDIO TYPE' />
            <InfoCard title={anime?.animeDetails?.totalEpisodes} type='EPISODES NUM' />
            <InfoCard title={anime?.animeDetails?.releaseDate} type='RELEASE DATE' />
            <InfoCard title={anime?.animeDetails?.type?.toLowerCase().replace('anime','').toUpperCase()} type='ANIME TYPE' />
          
        </div>

        

      </div>
    </div>
  )
}

export default AnimeHero