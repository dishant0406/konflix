import { Search } from 'components'
import {useRouter} from 'next/router'
import { client } from 'pages/_app'
import { GET_STREAMING_LINK } from '@/utils/graphql/Queries'
import { useEffect, useRef, useState } from 'react'
import Plyr from "plyr-react"
import Hls from "hls.js";
import Head from 'next/head'

function capitalizeAndSplit(inputString) {
  if(inputString){
    let words = inputString.split("-");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
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
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transform: episodeId === link?.episodeId ? 'scale(1.1)' : isHover ? 'scale(1.1)' : 'scale(1)',
        opacity: episodeId === link?.episodeId ? 1 : 0.5,
      }}  className='h-[4rem] cursor-pointer transition-all duration-300 w-[7rem] rounded-md bg-black'>
          
      </div>
      <div onClick={
      ()=>{
        setCurrentEpisode(null)
        router.push(`/watch/${animeID}/${link?.episodeId}`)
      }} className='absolute cursor-pointer bottom-[0.7rem] left-[2.5rem]'>
        <p className={`text-white ${
          episodeId === link?.episodeId ? 'opacity-100': isHover ? 'opacity-100' : 'opacity-0'
        }  text-[30px] transition-all duration-300 font-bold text-center`}>{
          index<9 ? `0${index+1}` : index+1
        }</p>
      </div>
    </div>
  )
}

const Watch = () => {
  const router = useRouter()
  const {animeID, id:episodeId} = router.query
  const [streamingLink, setStreamingLink] = useState([])
  const [animeDetails, setAnimeDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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
          setAnimeDetails(res.data.animeDetails)
          setStreamingLink(res.data.animeDetails?.episode_id)
          setCurrentEpisode(linksArray?.hls)
          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        })
    }
  }, [animeID, episodeId])

  useEffect(() => {
    if (streamingLink.length>0) {
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
      loadVideo();
      setLoading(false)
    }
  })

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

  }


  return (
    <div className='relative'>
      <Head>
        <title>{capitalizeAndSplit(episodeId)} | Konflix</title>
        <meta name="description" content="Konflix is a free anime streaming website. Watch anime online in high quality for free. Watch and download anime in high quality 720p, 1080p English subbed and dubbed on any device." />
        <link rel="icon" href="/Images/favicon.ico" />

      </Head>
      {loading && <div className='fixed  z-[100] top-[45%] right-[45%]'>
        <img className='h-[100px]' src='/Images/loading.webp' />
      </div>}
      <div className={`${
        loading ? 'opacity-50' : 'opacity-100'
      } w-[100vw] pb-[125px] flex flex-col items-center`}>
        <Search/>
        <h1 onClick={
          ()=>{
            router.push('/info/'+ animeID)
          }
        } className='md:text-2xl cursor-pointer text-lg md:w-[70vw] font-bold text-white md:text-left mt-[10px] text-center md:mt-[1rem]'>
            {animeDetails?.name || capitalizeAndSplit(animeID)}
          </h1>
        <div style={{
            width: '70vw',
          }} className='mt-[0.5rem] overflow-hidden rounded-lg'>
          <Plyr  options={{...OPTIONS }}  id='plyr' ref={ref} source={{}}/>
        </div>
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
        </div>
      </div>
    </div>
  )
}

export default Watch