import React, { useState } from 'react'
import {poppinsBold,poppinsMedium} from 'utils/Fonts/fonts'
import { AiFillYoutube } from 'react-icons/ai'
const AnimeCard = ({title, image, release, other}) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div className='hover:scale-110 transition-all duration-300' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} >
                <div style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',

                }} className={`w-[130px] flex items-center justify-center cursor-pointer transition-all duration-300 h-[200px]  rounded-[20px]`}>
                    <div className={`${isHovered?'opacity-100':'opacity-0'} bg-white scale-110 hover:scale-125 transition-all duration-300`}>
                        <AiFillYoutube className='text-[#38a835] scale-[3]' />
                      </div>
                </div>
                <p className={`${poppinsMedium.className} ml-[5px] text-[14px] text-white mt-[8px]`}>
                  {title.slice(0, 18) + '...'}
                </p>
                <div className='flex items-center gap-[10px] mt-[5px]'>
                  <p className={`${poppinsBold.className} ml-[5px] text-[14px] text-white`}>
                    {release || 'N/A'}
                  </p>
                  <div className='border-red-600 border-2 rounded-md flex items-center justify-center px-[0.5rem]'>
                    <p className={`${poppinsBold.className} text-[14px] text-center text-white`}>
                      {other || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
  )
}

export default AnimeCard