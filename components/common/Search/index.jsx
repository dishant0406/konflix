import {useRouter} from 'next/router'
import {poppinsBold,poppinsMedium} from 'utils/Fonts/fonts'
import { RiSearch2Line as CgSearch } from 'react-icons/ri'
import { client } from 'pages/_app'
import { GET_SEARCH_ANIME } from '@/utils/graphql/Queries'
import { useEffect, useState } from 'react'

const Search = () => {
  const router = useRouter()
  const [result, setResult] = useState([])
  const [search, setSearch] = useState('')
  const handleGoto = () => {
    router.push(`/`)
  }

  useEffect(()=>{
    //delayed search

    if(search.length === 0){
      setResult([])
      return
    }

    const delayDebounceFn = setTimeout(() => {
      if(search){
        client.query({
          query: GET_SEARCH_ANIME,
          variables: {
            animeSearchId: search
          }
        }).then(res=>{
          console.log(res.data.animeSearch)
          setResult(res.data.animeSearch)
        })
      }
    }
    , 500)
    return () => clearTimeout(delayDebounceFn)
    
  },[search])

  return (
    <div>
        <div className='w-[90vw] flex justify-between mt-[0.5rem] md:mt-[1rem]'>
        <p style={{
          textShadow: '0px 0px 10px rgba(0,0,0,1)'

        }} onClick={handleGoto} className={`${poppinsBold.className
          } text-white cursor-pointer text-[30px] font-bold`}>
          KonFlix
        </p>
        <div className='relative'>
          <input style={{
            //glassmorphism
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba( 0,0,0,0.45)'
          }} value={search} onChange={(e)=>setSearch(e.target.value)} type='text' autoComplete="new-password" placeholder='Search for a anime' className={`${poppinsMedium.className} pr-[2.5rem] max-w-[300px] tracking-wider text-white !outline-none px-[1rem] h-[2.5rem] border-none  rounded-2xl`} />
          <div className='absolute right-[20px] top-[12px]'>
            <CgSearch className='text-white scale-[1.30]' />
          </div>
          <div style={{
            //glassmorphism
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba( 0,0,0,0.45)'

          }} className='w-[220px] absolute top-[45px] overflow-hidden rounded-2xl left-[0]'>
             {
              result.slice(0,3).map((e,i)=>(
                <div key={e.id} onClick={()=>{
                  router.push(`/info/${e.id}`)
                  setSearch('')
                }} className='flex cursor-pointer transition-all duration-300 hover:scale-105 justify-start gap-[5px] py-[10px]'>
                <div className='h-[40px] ml-[20px] w-[40px] rounded-2xl' style={{
                  backgroundImage: `url(${e.imgUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',

                }}>
                  
                </div>
                <p className={`${poppinsMedium.className} text-[14px] text-white mt-[8px]`}>
                  {e.title.length > 20 ? e.title.slice(0,20)  + '...': e.title}
                </p>
              </div>
              ))

             }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search