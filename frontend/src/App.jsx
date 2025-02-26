import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { MdDeleteForever } from "react-icons/md";
function App() {
  const [inputUrl, setInputUrl] = useState("")
  const [urlsArray, setUrlsArray] = useState([])
  const [error, setError] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [totalPages, setTotalPages] = useState()
  const [totalURLCount, setTotalURLCouunt] = useState()
  const getData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}?page=${page}&limit=${limit}`)
      if (res.data.status == 1) {
        setTotalPages(res.data.totalPages)
        setUrlsArray(res.data.data)
      } else {
        setError(error.push(res.data.error))
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(() => {
    getData()
  }, [page, limit])

  const sendData = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL, { inputUrl: inputUrl })
      if (res.data.status == 1) {
        // setUrlsArray([...urlsArray,res.data.data])
        getData()
      }
    } catch (error) {
      setError(res.data.error)
      // console.log(res.data.error)
      console.error(error.message)
    }
  }

  const handleDeleteURL = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`)
      getData()
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      {/* {error.length !== 0 &&
        error.map(error => <h5>{error}</h5>)}
      <h1 className='text-3xl font-bold '>URL Shortner {inputUrl}</h1>
      <input type='url' onChange={(e) => setInputUrl(e.target.value)} placeholder='enter url' />
      <button onClick={sendData}>send</button>

      
      {urlsArray.length !== 0 ? <ul>{urlsArray.map(url => <li key={url._id}><a href={url.originalURL}>{url.shortURL}</a></li>)}</ul> : <h4>no urls found</h4>}
     */}
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        {/* Error Messages */}
        {error.length !== 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error.map((err, index) => (
              <h5 key={index}>{err}</h5>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold text-center mb-4">
          URL Shortener
        </h1>

        {/* Input Field */}
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter URL"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendData}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Shorten
          </button>
        </div>

        {/* Display URLs */}
        {urlsArray.length !== 0 ? (
          <ul className="mt-6 w-full space-y-3">
            {urlsArray.map((url) => (
              <div key={url._id} className='flex w-full flex-wrap items-center justify-between flex-row'>
              <li
                className="bg-gray-100 p-3 w-5/6 rounded-lg flex justify-between items-center"
              >
                <span className="text-gray-800 truncate">{url.originalURL}</span>
                <a
                  href={url.originalURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {url.shortURL}
                </a>
              </li>
              <button onClick={() => handleDeleteURL(url._id)} className='bg-red-400 px-3 py-2 rounded-md font-semibold text-xl'><MdDeleteForever /></button>
              </div>
            ))}
          </ul>
        ) : (
          <h4 className="mt-4 text-gray-600 text-center">No URLs found</h4>
        )}
        <div className=' flex flex-row items-center justify-center gap-3 my-3'>
        <button disabled={page !==1 ? false :true} onClick={()=>{setPage(page-1)}} className='bg-blue-500 rounded-md px-3 py-2'>Prev</button>
         <p className=' text-black font-bold text-base'>{page} / {totalPages}</p>
        <button disabled={page === totalPages ? true :false} onClick={()=>setPage(page+1)} className='bg-blue-500 rounded-md px-3 py-2'>Next</button>
        </div>
      </div>
    </>
  )
}

export default App
