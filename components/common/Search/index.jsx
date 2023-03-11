import React from 'react'
import {poppinsBold,poppinsMedium} from 'utils/Fonts/fonts'
import { RiSearch2Line as CgSearch } from 'react-icons/ri'
const Search = () => {
  return (
    <div>
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
    </div>
  )
}

export default Search