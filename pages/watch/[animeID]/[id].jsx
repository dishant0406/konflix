import { AnimeCard, Search } from 'components'
import {useRouter} from 'next/router'
import { client } from 'pages/_app'
import { GET_STREAMING_LINK, GET_RECOMMEDED_ANIME } from '@/utils/graphql/Queries'
import { useEffect, useRef, useState } from 'react'
import Plyr from "plyr-react"
import Hls from "hls.js";
import Head from 'next/head'

function capitalizeAndSplit(inputString) {
  if(inputString){
    let words = inputString.split("-");
    for (let i = 0; i < words.length; i++) {
      if(words[i]){
        words[i] = words[i][0]?.toUpperCase() + words[i].slice(1);
      }
    }
    return words.join(" ");
  }
}


const AnimeListCard = ({image, currentEpisode, link, index, setCurrentEpisode,episodeId})=>{
  const router = useRouter()
  const {animeID, id} = router.query
  const [isHover, setIsHover] = useState(false)
  return (
    <div onMouseEnter={
      ()=>{
        if(currentEpisode!==link.url){
          setIsHover(true)
        }
      }
    } onMouseLeave={
      ()=>{
        if(currentEpisode!==link.url){
          setIsHover(false)
        }
      }
    } onClick={
      ()=>{
        setCurrentEpisode(null)
        router.push(`/watch/${animeID}/${link?.episodeId}`)
      }
    } className='relative'>
      <div style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transform: episodeId === link?.episodeId ? 'scale(1.1)' : isHover ? 'scale(1.1)' : 'scale(1)',
        opacity: episodeId === link?.episodeId ? 1 : 0.5,
      }}  className='md:h-[3rem] h-[2rem] w-[3rem] cursor-pointer transition-all duration-300 md:w-[4rem] rounded-md bg-black'>
          
      </div>
      <div onClick={
      ()=>{
        setCurrentEpisode(null)
        router.push(`/watch/${animeID}/${link?.episodeId}`)
      }} className='absolute cursor-pointer bottom-[0.2rem] left-[0.8rem] md:left-[1rem]'>
        <p className={`text-white ${
          episodeId === link?.episodeId ? 'opacity-100': isHover ? 'opacity-100' : 'opacity-0'
        } text-[20px] md:text-[30px] transition-all duration-300 font-bold text-center`}>{
          index<9 ? `0${index+1}` : index+1
        }</p>
      </div>
    </div>
  )
}

const OPTIONS = {
  controls: [
    'play-large',
    'play',
    'progress',
    'current-time',
    'mute',
    'volume',
    'settings',
    'pip',
    'airplay',
    'fullscreen',
  ],
  settings: ['captions', 'quality', 'speed'],
  quality: {
    default: 720,
    options: [360, 480, 720, 1080],
  },
  speed: {
    selected: 1,
  },
  keyboard: {
    focused: true,
    global: true,
  },
  tooltips: {
    controls: true,
    seek: true,
  },
  fullscreen: {
    enabled: true,
    fallback: true,
    iosNative: true,
  },
  autoplay: false,
  loop: {
    active: false,
  },
  invertTime: false,
  clickToPlay: true,
  hideControls: false,
  resetOnEnd: false,
  disableContextMenu: false,
  loadSprite: true,
  iconUrl: 'https://cdn.plyr.io/3.6.8/plyr.svg',
  blankVideo: 'https://cdn.plyr.io/static/blank.mp4',
  previewThumbnails: {
    enabled: false,
    src: '',
  },
  //ios play
  playsinline: true,

}

const Watch = () => {
  const router = useRouter()
  const {animeID, id:episodeId} = router.query
  const [streamingLink, setStreamingLink] = useState([])
  const [streamingAnimeDetails, setStreamingAnimeDetails] = useState({})
  const [recommandedAnime, setRecommandedAnime] = useState([])
  const [animeDetails, setAnimeDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [playingType, setPlayingType] = useState('hls')
  const ref = useRef(null)
  const [currentEpisode, setCurrentEpisode] = useState('')

  useEffect(() => {
    if (animeID && episodeId) {
      client
        .query({
          query: GET_STREAMING_LINK,
          variables:{
            streamLinkDetailsId: episodeId,
            animeDetailsId: animeID
          }
        })
        .then((res) => {
          const linksArray = res.data.streamLinkDetails
          setStreamingAnimeDetails(linksArray)
          setAnimeDetails(res.data.animeDetails)
          setStreamingLink(res.data.animeDetails?.episode_id)
          setCurrentEpisode(linksArray?.hls)

          client.query({
            query: GET_RECOMMEDED_ANIME,
            variables:{
              genre: res.data.animeDetails?.genres[0],
            }
          }).then((res)=>{
            setRecommandedAnime(res.data?.recommandedAnime)
          }).catch((err)=>{
            console.log(err)
          })

          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        })
    }
  }, [animeID, episodeId])

  const loadVideo = async () => {
    const video = document.getElementById("plyr");
    //video width 70vw
    var hls = new Hls();
    hls.loadSource(`https://cors.konflix.xyz/${currentEpisode}`);
    hls.attachMedia(video);
    ref.current.plyr.media = video
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
  };

  useEffect(() => {
    if (streamingLink.length>0 && ref?.current) {
      loadVideo();
      setLoading(false)
    }
  })

  useEffect(()=>{

    if (playingType !== 'hls' && ref?.current) {
      console.log(ref.current)
      ref.current.plyr.volume = 0
    }else if(playingType === 'hls' && ref?.current){
      ref.current.plyr.volume = 0.5
    }

  },[playingType, ref.current])




  return (
    <div className='relative'>
      <Head>
        <title>{capitalizeAndSplit(episodeId)} | Konflix</title>
        <meta name="description" content="Konflix is a free anime streaming website. Watch anime online in high quality for free. Watch and download anime in high quality 720p, 1080p English subbed and dubbed on any device." />
        <link rel="icon" href="/Images/favicon.ico" />

      </Head>
      {loading && ref?.current?.plyr?.loading && <div className='fixed  z-[100] top-[45%] right-[45%]'>
        <img className='h-[100px]' src='/Images/loading.webp' />
      </div>}
      <div className={`${
        loading ? 'opacity-50' : 'opacity-100'
      } w-[100vw] pb-[125px] flex flex-col items-center`}>
        <Search/>
        <div className='flex md:gap-[1rem] gap-[0.5rem] md:flex-row flex-col items-center md:w-[70vw]'>
          <h1 onClick={
              ()=>{
                router.push('/info/'+ animeID)
              }
            } className='md:text-2xl cursor-pointer text-lg  font-bold text-white md:text-left mt-[10px] text-center md:mt-[1rem]'>
                {animeDetails?.name || capitalizeAndSplit(animeID)}
          </h1>
          <div className='flex gap-[0.5rem]'>
            <div onClick={()=>setPlayingType('hls')} className='bg-black cursor-pointer flex items-center justify-center rounded-md h-[2rem] px-[10px] md:mt-[1rem]'>
              <h1 className='text-sm font-bold text-white whitespace-nowrap'>
                Ad free
              </h1>
            </div>
            {streamingAnimeDetails?.streamsb && <div onClick={()=>setPlayingType('streamsb')} className='bg-black cursor-pointer flex items-center justify-center rounded-md h-[2rem] px-[10px] md:mt-[1rem]'>
              <h1 className='text-sm font-bold text-white whitespace-nowrap'>
                streamsb
              </h1>
            </div>}
            {streamingAnimeDetails?.xstreamcdn && <div onClick={()=>setPlayingType('xstreamcdn')} className='bg-black cursor-pointer flex items-center justify-center rounded-md h-[2rem] px-[10px] md:mt-[1rem]'>
              <h1 className='text-sm font-bold text-white whitespace-nowrap'>
                xstreamcdn
              </h1>
            </div>}
          </div>
        </div>
       
        <div style={{
            width: '70vw',
          }} className={`${playingType!=='hls' && 'hidden'} mt-[0.5rem] overflow-hidden rounded-lg`}>
          <Plyr  options={{...OPTIONS }}  id='plyr' ref={ref} source={{}}/>
        </div>
        {playingType==='streamsb' && <div style={{
            width: '70vw',
          }} className={`mt-[0.5rem] overflow-hidden md:h-[70vh] rounded-lg`}>
          <iframe src={`${streamingAnimeDetails?.streamsb}`} className='w-[100%] h-[100%]' frameBorder='0' scrolling='no' allowFullScreen></iframe>
        </div>}
        {playingType==='xstreamcdn' && <div style={{
            width: '70vw',
          }} className={`mt-[0.5rem] overflow-hidden md:h-[70vh] rounded-lg`}>
          <iframe src={`${streamingAnimeDetails?.xstreamcdn}`} className='w-[100%] h-[100%]' frameBorder='0' scrolling='no' allowFullScreen></iframe>
        </div>
        }
        <div>
          
          <div className='mt-[1rem] flex flex-wrap gap-[1rem] md:justify-start justify-center md:w-[90vw] w-[95vw]'>
            {
              streamingLink?.map((episodeid, index) => (
                <AnimeListCard
                 setCurrentEpisode={setCurrentEpisode}
                  key={index}
                  image={animeDetails.imageUrl}
                  currentEpisode={currentEpisode}
                  episodeId={episodeId}
                  link={episodeid}
                  index={index}
                />
              ))

            }
          </div>
          <div>
            <h1 className='text-white text-xl font-bold mt-[2rem]'>Recommanded Anime</h1>
            <div className='mt-[1rem] flex flex-wrap gap-[2rem] md:justify-start justify-center md:w-[90vw] w-[95vw]'>
              {
                recommandedAnime?.map((anime, index)=>{
                  return <AnimeCard id={anime?.animeId} title={anime?.animeTitle} image={anime?.animeImg} />
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Watch