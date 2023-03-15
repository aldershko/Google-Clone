import React,{createContext,useContext,useState,} from 'react'

const ResultContext = createContext()
const baseUrl = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/'

export const ResultContextProvider = ({children}) =>{
 const [results,setResults] = useState([])
 const [isLoading, setIsLoading] = useState(false)
 const [searchTerm,setSearchTerm] = useState('')

 const getResults = async(type) =>{
    setIsLoading(true)
    const response = await fetch(`${baseUrl}${type}`,{
        method:'GET',
        headers:{
            'X-RapidAPI-Key': '29e4467127mshc2d3bd3a0a0c059p166507jsnf2aa40f5a550',
    'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
        }
    })
    const data = await response.json()
    console.log(data)
    setResults(data)
    setIsLoading(false)
 }
 return (
    <ResultContext.Provider value={{getResults,results,searchTerm,setSearchTerm,isLoading}}>
        {children}
    </ResultContext.Provider>
 )
}

export const useResultContext = () =>useContext(ResultContext)