import React from 'react'
import {poppinsBold,poppinsMedium} from 'utils/Fonts/fonts'
import Slider from 'react-slick'
import {AnimeCard} from 'components'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 8,
  arrows: false,
  //items center
  centerMode: true,
  centerPadding: '0px',
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  cssEase: "linear",
  //list overflow y visible
  
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        centerMode: true,
        centerPadding: '30px',
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 2,
        centerMode: true,
        centerPadding: '0px',
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        //center
        centerMode: true,
        centerPadding: '20px',
        
      }
    }
  ]

}

const TrendingWeek = ({topAnimes, title}) => {
  return (
    <div className='w-[100vw] flex flex-col justify-center items-center'>
    <div className='w-[90vw] mt-[6rem]'>
      <p className={`${poppinsMedium.className} text-white text-[20px] font-bold`}>
        {title || '🔥 TRENDING THIS WEEK'}
      </p>
      <div className=' mt-[1rem] w-[90vw] '>
        <Slider {...settings}>
        {
          topAnimes.map((anime, index) => {
            const details = anime?.animeDetails
            return (
              <div key={details?.id}>
                <AnimeCard image={details?.image} title={details?.title} release={details?.releaseDate} other={details?.subOrDub} />
              </div>
            )
          })
        }
        </Slider>
      </div>
    </div>
  </div>
  )
}

export default TrendingWeek