import React from 'react'
import { RiSearch2Line as CgSearch } from 'react-icons/ri'
import { AiFillYoutube } from 'react-icons/ai'
import {poppinsBold,poppinsMedium} from 'utils/Fonts/fonts'

const Hero = ({selectedAnime, topAnimes,setSelectedAnime}) => {
  return (
    <div className='w-[100vw] transition-all duration-300 items-center h-[50vh] flex flex-col justify-between ' style={{
      backgroundImage: `url(${selectedAnime?.animeDetails?.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      //shadow from bottom 
      boxShadow: '0px -40px 45px -1px rgba(5,22,30,1) inset'
    }}>

      <div className='w-[90vw] flex justify-between mt-[1rem]'>
        <p style={{
          textShadow: '0px 0px 10px rgba(0,0,0,1)'

        }} className={`${poppinsBold.className
          } text-white text-[30px] font-bold`}>
          KonFlix
        </p>
        <div className='relative'>
          <input style={{
            //glassmorphism
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba( 0,0,0,0.45)'

          }} type='text' autoComplete="new-password" placeholder='Search for a anime' className={`${poppinsMedium.className} pr-[2.5rem] max-w-[300px] tracking-wider text-white !outline-none px-[1rem] h-[2.5rem] border-none  rounded-2xl`} />
          <div className='absolute right-[20px] top-[12px]'>
            <CgSearch className='text-white scale-[1.30]' />
          </div>
        </div>
      </div>

      <div className='w-[90vw]'>
        <p style={{
          textShadow: '0px 0px 10px rgba(0,0,0,1)'
        }} className={`${poppinsBold.className} transition-all duration-300 text-[38px] md:text-[56px] tracking-tight font-bold mb-[1rem] text-white`}>
          {selectedAnime?.animeDetails?.title.toUpperCase()}
        </p>

        <div className=' mb-[-3rem] gap-[40px] hidden md:flex'>
          {
            topAnimes?.slice(0, 6).map((anime, index) => {
              return (
                <div key={anime.animeDetails.id} onClick={() => setSelectedAnime(anime)} style={{
                  backgroundImage: `url(${anime?.animeDetails?.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',

                }} className={`w-[200px] flex items-center justify-center cursor-pointer transition-all duration-300  ${selectedAnime.animeDetails.id === anime.animeDetails.id ? 'border-white border-[2px] scale-110' : 'opacity-50'} h-[120px]  rounded-[20px]`}>
                  {
                    selectedAnime.animeDetails.id === anime.animeDetails.id && (
                      <div className='bg-white scale-110 hover:scale-125 transition-all duration-300'>
                        <AiFillYoutube className='text-[#38a835] scale-[3]' />
                      </div>
                    )
                  }
                </div>
              )
            })
          }
        </div>
        <div className=' mb-[-3rem] gap-[40px] md:hidden flex'>
          {
            topAnimes?.slice(0, 2).map((anime, index) => {
              return (
                <div key={anime.animeDetails.id} onClick={() => setSelectedAnime(anime)} style={{
                  backgroundImage: `url(${anime?.animeDetails?.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',

                }} className={`w-[200px] flex items-center justify-center cursor-pointer transition-all duration-300  ${selectedAnime.animeDetails.id === anime.animeDetails.id ? 'border-white border-[2px] scale-110' : 'opacity-50'} h-[120px]  rounded-[20px]`}>
                  {
                    selectedAnime.animeDetails.id === anime.animeDetails.id && (
                      <div className='bg-white scale-110 hover:scale-125 transition-all duration-300'>
                        <AiFillYoutube className='text-[#38a835] scale-[3]' />
                      </div>
                    )
                  }
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default Hero