import Header from "./Header"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react'
import TopMenu from './TopMenu'
import News from './News'


function App() {
  const [isLoading, setLoading] = useState(true)
  const [news, setNews] = useState([])
  
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.search.value 
    fetch(`/.netlify/functions/politie-news?query=${query}`, { headers: { accept: "Accept: application/json" } })
    .then((x) => x.json())
    .then(result => setNews(result.data.nieuwsberichten))
    .then(setLoading(false))
  }

  useEffect(() => {
    const query = 'Amsterdam'
    fetch(`/.netlify/functions/politie-news?query=${query}`, { headers: { accept: "Accept: application/json" } })
    .then((x) => x.json())
    .then(result => setNews(result.data.nieuwsberichten))
    .then(setLoading(false))
  },[]);

  return (
    <div className="app">
      <Header/>
      <TopMenu/>
      <News isLoading={isLoading} news={news} handleSearch={handleSearch}/>
    </div>
  )
}

export default App;
