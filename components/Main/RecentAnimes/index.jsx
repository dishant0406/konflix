import React from 'react'
import {poppinsBold,poppinsMedium} from 'utils/Fonts/fonts'
import Slider from 'react-slick'
import {AnimeCard} from 'components'

const RecentAnimes = ({recentAnimes, title}) => {
  return (
    <div className='w-[100vw] flex flex-col justify-center items-center'>
    <div className='w-[90vw]'>
      <p className={`${poppinsMedium.className} text-white text-[20px] font-bold`}>
        {title || '🔥 RECENT EPISODES'}
      </p>
      <div className='mt-[1rem] flex gap-[3rem] justify-center md:justify-start flex-wrap w-[90vw] '>

        {
          recentAnimes.map((anime, index) => {
            const {animeId, animeTitle, episodeId, episodeNumber, image} = anime
            return (
              <div key={animeId}>
                <AnimeCard id={animeId} image={image} title={animeTitle} release={new Date().getFullYear()} other={`Epis. ${episodeNumber}`} />
              </div>
            )
          })
        }

      </div>
    </div>
  </div>
  )
}

export default RecentAnimes