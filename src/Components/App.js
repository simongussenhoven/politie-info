import Header from "./Header"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react'
import TopMenu from './TopMenu'
import Loading from './Loading'
import News from './News'


function App() {
  const [isLoading, setLoading] = useState(true)
  const [msg, setMsg ] = useState("No info selected")
  const [news, setNews] = useState([])
  
  const handler = () => {
  fetch("/.netlify/functions/politie-news", { headers: { accept: "Accept: application/json" } })
    .then((x) => x.json())
    .then(result => console.log(result.data.nieuwsberichten))
    .then(data => setMsg(data))
  }

  useEffect(() => {
    fetch("/.netlify/functions/politie-news", { headers: { accept: "Accept: application/json" } })
    .then((x) => x.json())
    .then(result => setNews(result.data.nieuwsberichten))
    
    .then(setLoading(false))
  },[]);

  return (
    <div className="app">
      <Header/>
      <TopMenu/>
      <News isLoading={isLoading} news={news}/>
    </div>
  )
}

export default App;
