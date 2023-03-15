import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'

import { useResultContext } from '../contexts/ResultContextProvider'
import {Loading} from './Loading'

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext()
  const location = useLocation()

  useEffect(() => {
    if(searchTerm){
      if(location.pathname === '/images'){
        getResults(`ImageSearchAPI?q=${searchTerm}&pageSize=50`)
      }else{
        getResults(`WebSearchAPI?q=${searchTerm}&pageSize=50`)
      }
      
    }
   
  }, [searchTerm,location.pathname])
  
  console.log(location)

  if(isLoading) return <Loading />
  switch (location.pathname) {
    case '/search':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {results?.value?.map(({url,title},index) =>(
            <div key={index} className='md:w-2/5 w-full'>
              <a href={url} target ='_blank' rel='noreferrer'>
                <p className='text-sm'>
                  {url.length > 30 ? url.substring(0,30) : url}
                </p>
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
              </a>

            </div>
          ))}

        </div>
      )
      case '/images':
        return(
          <div className='flex flex-wrap justify-center items-center'>
            {results?.value?.map(({title,url,thumbnail},index)=>(
              <a  key ={index} className='sm:p-3 p-5' href={url} target='_blank' rel='noreferrer'>
                <img src={thumbnail} alt={title} loading='lazy' />
                <p className='w-36 break-words text-sm mt-2'>{title}</p>
              </a>

            ))}

          </div>
        )
      
  
    default:
      return 'ERROR'
  }
}


